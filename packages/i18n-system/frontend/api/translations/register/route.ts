import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function POST(request: NextRequest) {
  try {
    const { code, page } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code required" }, { status: 400 });
    }

    // Check if already exists in Strapi
    const checkRes = await fetch(
      `${STRAPI_URL}/api/ui-texts?filters[code][$eq]=${encodeURIComponent(code)}`,
      {
        headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      }
    );
    const checkData = await checkRes.json();

    if (checkData.data?.length > 0) {
      return NextResponse.json({ registered: false, reason: "already_exists" });
    }

    // Create new entry
    const createRes = await fetch(`${STRAPI_URL}/api/ui-texts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { code, text: code, page: page || "auto-registered" },
      }),
    });

    if (!createRes.ok) {
      return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }

    // Invalidate Redis cache
    try {
      const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
      const Redis = require("ioredis");
      const redis = new Redis(redisUrl);
      await redis.del("translations:de", "translations:en");
      await redis.quit();
    } catch {}

    return NextResponse.json({ registered: true });
  } catch (error) {
    console.error("[translations/register] Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}