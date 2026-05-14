/**
 * Seed script for adlix-consent
 * Creates demo circle with 5 members and 3 projects in different phases
 *
 * Usage: node seed.js
 * All passwords are demo1234
 */

const { Client } = require("pg");

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://consent:consent@consent_postgres:5432/consent";

// Demo data
const DEMO_USERS = [
  { email: "demo1@example.com", username: "demo1", password: "demo1234" },
  { email: "demo2@example.com", username: "demo2", password: "demo1234" },
  { email: "demo3@example.com", username: "demo3", password: "demo1234" },
  { email: "demo4@example.com", username: "demo4", password: "demo1234" },
  { email: "demo5@example.com", username: "demo5", password: "demo1234" },
];

const DEMO_PROJECTS = [
  {
    name: "Demo-Vorhaben — Beschlossen",
    description:
      "Dieses Vorhaben wurde bereits beschlossen. Es dient als Beispiel für den beschlossenen Status.",
    goal: "Einigung über einen bereits getroffenen Beschluss demonstrieren.",
    tension: "Alle waren sich einig, dass das Thema wichtig ist.",
    status: "beschlossen",
    outcome: "Das Vorhaben wurde einstimmig angenommen.",
    nextSteps: "Umsetzung beginnen.",
    evaluationDate: "2026-06-10",
  },
  {
    name: "Demo-Vorhaben — In Abstimmung",
    description:
      "Dieses Vorhaben hat eine offene Abstimmungsrunde mit gemischten Votes. Es ist bereit für den Consent-Prozess.",
    goal: "Abstimmungsprozess mit verschiedenen Ständen demonstrieren.",
    tension: "Es gibt leichte Bedenken bezüglich der Umsetzung.",
    status: "active",
  },
  {
    name: "Demo-Vorhaben — Entwurf",
    description:
      "Dieses Vorhaben ist noch im Entwurf. Es zeigt den draft-Status des Consent-Flows.",
    goal: "Einen neuen Vorschlag in der draft-Phase zeigen.",
    tension: "Das Thema wurde noch nicht formal eingereicht.",
    status: "draft",
  },
];

const VOTES_FOR_ROUND = [
  {
    userEmail: "demo1@example.com",
    choice: "consent",
    reason: "Klingt gut, keine Einwände.",
  },
  {
    userEmail: "demo2@example.com",
    choice: "minor_objection",
    reason: "Ich hätte gerne mehr Details zur Umsetzung.",
  },
  { userEmail: "demo3@example.com", choice: "consent", reason: null },
  { userEmail: "demo4@example.com", choice: "abstain", reason: null },
];

async function hashPassword(password) {
  // Simple bcrypt approximation - in production use proper bcrypt
  const bcrypt = require("bcryptjs");
  return bcrypt.hash(password, 10);
}

async function seed() {
  const client = new Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log("Connected to database");

    // Check if demo data already exists (idempotency)
    const existingDemo = await client.query(
      "SELECT id FROM users WHERE email = 'demo1@example.com' LIMIT 1",
    );

    if (existingDemo.rows.length > 0) {
      console.log("Demo data already exists — skipping seed (idempotent)");
      console.log("To re-seed, delete demo users first");
      return;
    }

    // 1. Create users
    console.log("Creating demo users...");
    const userIds = [];

    for (const userData of DEMO_USERS) {
      const passwordHash = await hashPassword(userData.password);

      const result = await client.query(
        `INSERT INTO users_passwords (email, username, password, role, is_active, confirmed)
         VALUES ($1, $2, $3, 'authenticated', true, true)
         RETURNING id`,
        [userData.email, userData.username, passwordHash],
      );
      userIds.push({ email: userData.email, id: result.rows[0].id });
      console.log(`  Created user: ${userData.email}`);
    }

    // 2. Create circle
    console.log("Creating demo circle...");
    const ownerId = userIds[0].id;

    const circleResult = await client.query(
      `INSERT INTO circles (name, description, invite_token, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $4)
       RETURNING id`,
      [
        "Demo-Kreis",
        "Ein Demo-Kreis zum Testen des Consent-Workflows.",
        "demo-circle-token-2026",
        ownerId,
      ],
    );
    const circleId = circleResult.rows[0].id;
    console.log(`  Created circle: Demo-Kreis (ID: ${circleId})`);

    // 3. Add circle members
    console.log("Adding circle members...");
    for (const user of userIds) {
      await client.query(
        `INSERT INTO circle_members (circle_id, user_id, role, created_by, updated_by)
         VALUES ($1, $2, $3, $1, $1)`,
        [
          circleId,
          user.id,
          user.email === "demo1@example.com" ? "admin" : "member",
        ],
      );
    }
    console.log(`  Added ${userIds.length} members to circle`);

    // 4. Create projects
    console.log("Creating demo projects...");
    const projectIds = [];

    for (const projectData of DEMO_PROJECTS) {
      const result = await client.query(
        `INSERT INTO projects (name, description, goal, tension, status, outcome, next_steps, evaluation_date, owner_id, circle_id, published_at, created_by, updated_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $9, $9)
         RETURNING id`,
        [
          projectData.name,
          projectData.description,
          projectData.goal || null,
          projectData.tension || null,
          projectData.status,
          projectData.outcome || null,
          projectData.nextSteps || null,
          projectData.evaluationDate || null,
          ownerId,
          circleId,
        ],
      );
      projectIds.push(result.rows[0].id);

      // Add participants
      for (const user of userIds) {
        await client.query(
          `INSERT INTO project_participants (project_id, user_id, created_at)
           VALUES ($1, $2, NOW())`,
          [result.rows[0].id, user.id],
        );
      }

      console.log(
        `  Created project: ${projectData.name} (ID: ${result.rows[0].id})`,
      );
    }

    // 5. Create voting round for the active project
    console.log("Creating voting round with votes...");
    const activeProjectId = projectIds[1];

    const roundResult = await client.query(
      `INSERT INTO rounds (round_number, proposal, status, start_date, created_by, updated_by, project_id)
       VALUES ($1, $2, $3, NOW(), $4, $4, $5)
       RETURNING id`,
      [
        1,
        "Wir setzen das Vorhaben wie vorgeschlagen um und evaluieren nach 4 Wochen.",
        "voting",
        ownerId,
        activeProjectId,
      ],
    );
    const roundId = roundResult.rows[0].id;

    // Link round to project as currentRound
    await client.query(
      `UPDATE projects SET current_round_id = $1 WHERE id = $2`,
      [roundId, activeProjectId],
    );
    console.log(`  Created voting round (ID: ${roundId})`);

    // Create votes
    for (const voteData of VOTES_FOR_ROUND) {
      const userId = userIds.find((u) => u.email === voteData.userEmail).id;
      await client.query(
        `INSERT INTO votes (choice, reason, created_by, updated_by, user_id, round_id)
         VALUES ($1, $2, $3, $3, $4, $5)`,
        [voteData.choice, voteData.reason, ownerId, userId, roundId],
      );
    }
    console.log(`  Created ${VOTES_FOR_ROUND.length} votes`);

    console.log("\n✅ Seed completed successfully!");
    console.log("\nLogin credentials:");
    for (const user of DEMO_USERS) {
      console.log(`  ${user.email} / ${user.password}`);
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
    throw error;
  } finally {
    await client.end();
  }
}

seed().catch(console.error);
