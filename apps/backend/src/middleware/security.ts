/**
 * Security Middleware
 * Setzt Security-Headers für alle Requests
 */
const createSecurityMiddleware = () => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Security Headers (CSP wird separat konfiguriert)
    ctx.set('X-Frame-Options', 'DENY');
    ctx.set('X-Content-Type-Options', 'nosniff');
    ctx.set('X-XSS-Protection', '1; mode=block');
    ctx.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    ctx.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    await next();
  };
};

export default createSecurityMiddleware;