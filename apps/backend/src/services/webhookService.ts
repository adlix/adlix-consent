/**
 * Webhook Service - Slack/Discord Notifications
 */

interface WebhookConfig {
  provider: 'slack' | 'discord';
  url: string;
  enabled: boolean;
}

interface WebhookEvent {
  type: 'proposal_created' | 'vote_started' | 'objection_raised' | 'consent_reached';
  circleName: string;
  proposalTitle: string;
  actorName: string;
  timestamp: string;
}

// Slack/Discord Message Builder
function buildMessage(event: WebhookEvent): any {
  const emoji: Record<string, string> = {
    proposal_created: '📝',
    vote_started: '🗳️',
    objection_raised: '✋',
    consent_reached: '✅',
  };
  
  const text: Record<string, string> = {
    proposal_created: 'Neues Vorhaben',
    vote_started: 'Abstimmung gestartet',
    objection_raised: 'Einwand eingebracht',
    consent_reached: 'Konsent erreicht!',
  };
  
  return {
    text: `${emoji[event.type]} ${text[event.type]} in ${event.circleName}`,
    embeds: [{
      title: event.proposalTitle,
      color: event.type === 'consent_reached' ? 0x16a34a : 0x2563eb,
      fields: [
        { name: 'Kreis', value: event.circleName, inline: true },
        { name: 'Aktion', value: text[event.type], inline: true },
        { name: 'Von', value: event.actorName, inline: true },
      ],
      timestamp: event.timestamp,
    }],
  };
}

// Send to Slack
export async function sendSlackWebhook(config: WebhookConfig, event: WebhookEvent) {
  if (!config.enabled || config.provider !== 'slack') return;
  
  const payload = buildMessage(event);
  
  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Slack webhook error:', error);
    return false;
  }
}

// Send to Discord (Discord uses Slack-compatible webhooks)
export async function sendDiscordWebhook(config: WebhookConfig, event: WebhookEvent) {
  if (!config.enabled || config.provider !== 'discord') return;
  
  const payload = buildMessage(event);
  
  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Discord webhook error:', error);
    return false;
  }
}

// Main send function
export async function notifyWebhook(configs: WebhookConfig[], event: WebhookEvent) {
  const results = await Promise.all(
    configs.map(config => 
      config.provider === 'slack' 
        ? sendSlackWebhook(config, event)
        : sendDiscordWebhook(config, event)
    )
  );
  
  return results.some(r => r);
}

// Test webhook
export async function testWebhook(config: WebhookConfig): Promise<boolean> {
  const testEvent: WebhookEvent = {
    type: 'consent_reached',
    circleName: 'Test',
    proposalTitle: 'Test-Nachricht',
    actorName: 'System',
    timestamp: new Date().toISOString(),
  };
  
  return config.provider === 'slack' 
    ? sendSlackWebhook(config, testEvent)
    : sendDiscordWebhook(config, testEvent);
}