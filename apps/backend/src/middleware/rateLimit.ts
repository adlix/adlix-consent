/**
 * Rate Limiting Middleware
 * 100 req/min per IP, 1000 req/min per User, 60 req/min per API Token
 */
import type { Core } from '@strapi/strapi';

// In-Memory Store (später: Redis für Production)
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const userRequests = new Map<number, { count: number; resetAt: number }>();
const tokenRequests = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 Minute
const IP_LIMIT = 100;
const USER_LIMIT = 1000;
const TOKEN_LIMIT = 60;

const createRateLimitMiddleware = () => {
  return async (ctx: any, next: () => Promise<void>) => {
    const now = Date.now();
    const ip = ctx.ip || ctx.request.ip || 'unknown';
    const userId = ctx.state?.user?.id;
    const apiToken = ctx.state?.apiToken?.token;

    // IP-based Rate Limiting
    let ipData = ipRequests.get(ip);
    if (!ipData || now > ipData.resetAt) {
      ipData = { count: 0, resetAt: now + WINDOW_MS };
      ipRequests.set(ip, ipData);
    }
    
    ipData.count++;
    
    if (ipData.count > IP_LIMIT) {
      ctx.set('Retry-After', String(Math.ceil((ipData.resetAt - now) / 1000)));
      ctx.throw(429, 'Rate limit exceeded. Try again later.');
      return;
    }

    // User-based Rate Limiting (wenn eingeloggt)
    if (userId) {
      let userData = userRequests.get(userId);
      if (!userData || now > userData.resetAt) {
        userData = { count: 0, resetAt: now + WINDOW_MS };
        userRequests.set(userId, userData);
      }
      
      userData.count++;
      
      if (userData.count > USER_LIMIT) {
        ctx.set('Retry-After', String(Math.ceil((userData.resetAt - now) / 1000)));
        ctx.throw(429, 'User rate limit exceeded. Try again later.');
        return;
      }
    }

    // Token-based Rate Limiting (für Public API)
    if (apiToken) {
      let tokenData = tokenRequests.get(apiToken);
      if (!tokenData || now > tokenData.resetAt) {
        tokenData = { count: 0, resetAt: now + WINDOW_MS };
        tokenRequests.set(apiToken, tokenData);
      }

      tokenData.count++;

      if (tokenData.count > TOKEN_LIMIT) {
        ctx.set('Retry-After', String(Math.ceil((tokenData.resetAt - now) / 1000)));
        ctx.throw(429, 'API token rate limit exceeded. Try again later.');
        return;
      }
    }

    // Headers setzen
    let effectiveLimit = IP_LIMIT;
    let effectiveRemaining = IP_LIMIT - ipData.count;

    if (apiToken) {
      effectiveLimit = TOKEN_LIMIT;
      effectiveRemaining = TOKEN_LIMIT - (tokenRequests.get(apiToken)?.count || 0);
    } else if (userId) {
      effectiveLimit = USER_LIMIT;
      effectiveRemaining = USER_LIMIT - (userRequests.get(userId)?.count || 0);
    }

    ctx.set('X-RateLimit-Limit', String(effectiveLimit));
    ctx.set('X-RateLimit-Remaining', String(effectiveRemaining));

    await next();
  };
};

export default createRateLimitMiddleware;
