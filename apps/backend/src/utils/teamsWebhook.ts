/**
 * Microsoft Teams Webhook Integration
 * Sendet Benachrichtigungen an Teams Kanäle bei Consent-Events
 */

interface TeamsCard {
  "@type": "MessageCard";
  "@context": "http://schema.org/extensions";
  themeColor?: string;
  summary?: string;
  sections?: {
    activityTitle?: string;
    activitySubtitle?: string;
    activityImage?: string;
    facts?: { name: string; value: string }[];
    text?: string;
    markdown?: boolean;
  }[];
  potentialAction?: {
    "@type": string;
    name: string;
    targets?: { os: string; uri: string }[];
  }[];
}

interface TeamsNotification {
  webhookUrl: string;
  projectName: string;
  roundNumber: number;
  eventType:
    | "new_round"
    | "vote_started"
    | "objection_raised"
    | "round_completed"
    | "abstention_info_request"
    | "abstention_clarification_request";
  details?: {
    proposal?: string;
    userName?: string;
    objectionReason?: string;
    objectionSeverity?: string;
    voteResults?: { yes: number; no: number; abstain: number };
    abstentionReason?: string; // B or C
    abstentionDetail?: string; // what info/clarification is needed
    ownerName?: string;
  };
}

class TeamsWebhookService {
  private webhookUrl: string | null = null;

  setWebhookUrl(url: string) {
    this.webhookUrl = url;
  }

  private createCard(notification: TeamsNotification): TeamsCard {
    const colors: Record<string, string> = {
      new_round: "0078D4",
      vote_started: "0078D4",
      objection_raised: "FFB900",
      round_completed: "107C10",
      abstention_info_request: "FF8C00",
      abstention_clarification_request: "FF8C00",
    };

    const titles: Record<string, string> = {
      new_round: "🆕 Neue Runde gestartet",
      vote_started: "🗳️ Abstimmung gestartet",
      objection_raised: "✋ Neuer Einspruch",
      round_completed: "✅ Runde abgeschlossen",
      abstention_info_request: "📚 Info-Anfrage — mehr Informationen benötigt",
      abstention_clarification_request: "🤔 Klärungsbedarf — ein Teil ist unklar",
    };

    const facts: { name: string; value: string }[] = [
      { name: "Projekt", value: notification.projectName },
      { name: "Runde", value: `#${notification.roundNumber}` },
    ];

    if (notification.details?.userName) {
      facts.push({ name: "Von", value: notification.details.userName });
    }

    if (notification.details?.objectionSeverity) {
      facts.push({
        name: "Schweregrad",
        value: notification.details.objectionSeverity,
      });
    }

    if (notification.details?.voteResults) {
      const { yes, no, abstain } = notification.details.voteResults;
      facts.push({
        name: "Ergebnis",
        value: `👍 ${yes} | 👎 ${no} | ➖ ${abstain}`,
      });
    }

    if (notification.details?.abstentionReason) {
      facts.push({
        name: "Typ",
        value:
          notification.details.abstentionReason === "B"
            ? "📚 Mehr Informationen benötigt"
            : "🤔 Klärung benötigt",
      });
    }
    if (notification.details?.ownerName) {
      facts.push({ name: "An", value: notification.details.ownerName });
    }

    let text = "";
    if (notification.details?.proposal) {
      text = `**Vorschlag:**\n${notification.details.proposal.substring(0, 200)}${
        notification.details.proposal.length > 200 ? "..." : ""
      }`;
    }
    if (notification.details?.objectionReason) {
      text = `**Begründung:**\n${notification.details.objectionReason}`;
    }
    if (notification.details?.abstentionDetail) {
      text = `**Anliegen:**\n${notification.details.abstentionDetail}`;
    }

    return {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      themeColor: colors[notification.eventType] || "0078D4",
      summary: titles[notification.eventType],
      sections: [
        {
          activityTitle: titles[notification.eventType],
          activitySubtitle: notification.projectName,
          facts,
          ...(text ? { text, markdown: true } : {}),
        },
      ],
      potentialAction: [
        {
          "@type": "OpenUri",
          name: "Im Projekt ansehen",
          targets: [
            {
              os: "default",
              uri: `${process.env.FRONTEND_URL || "http://localhost:3000"}/projects`,
            },
          ],
        },
      ],
    };
  }

  async send(notification: TeamsNotification): Promise<boolean> {
    const webhookUrl = this.webhookUrl || process.env.TEAMS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Teams webhook URL not configured");
      return false;
    }

    const card = this.createCard(notification);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        console.error(`Teams webhook error: ${response.status}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to send Teams notification:", error);
      return false;
    }
  }

  async notifyNewRound(
    projectName: string,
    roundNumber: number,
    proposal: string,
  ) {
    return this.send({
      webhookUrl: "",
      projectName,
      roundNumber,
      eventType: "new_round",
      details: { proposal },
    });
  }

  async notifyVoteStarted(
    projectName: string,
    roundNumber: number,
    proposal: string,
  ) {
    return this.send({
      webhookUrl: "",
      projectName,
      roundNumber,
      eventType: "vote_started",
      details: { proposal },
    });
  }

  async notifyObjection(
    projectName: string,
    roundNumber: number,
    userName: string,
    reason: string,
    severity: string,
  ) {
    return this.send({
      webhookUrl: "",
      projectName,
      roundNumber,
      eventType: "objection_raised",
      details: {
        userName,
        objectionReason: reason,
        objectionSeverity: severity,
      },
    });
  }

  async notifyAbstentionRequest(
    projectName: string,
    roundNumber: number,
    userName: string,
    reason: "B" | "C",
    detail: string,
    ownerName: string,
  ) {
    return this.send({
      webhookUrl: "",
      projectName,
      roundNumber,
      eventType:
        reason === "B"
          ? "abstention_info_request"
          : "abstention_clarification_request",
      details: {
        userName,
        abstentionReason: reason,
        abstentionDetail: detail,
        ownerName,
      },
    });
  }

  async notifyRoundCompleted(
    projectName: string,
    roundNumber: number,
    results: { yes: number; no: number; abstain: number },
  ) {
    return this.send({
      webhookUrl: "",
      projectName,
      roundNumber,
      eventType: "round_completed",
      details: { voteResults: results },
    });
  }
}

// Singleton instance
export const teamsWebhook = new TeamsWebhookService();

export default teamsWebhook;
