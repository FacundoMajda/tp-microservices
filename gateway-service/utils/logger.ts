type LogData = Record<string, any>;

export class Logger {
  private static readonly SERVICE_NAME = 'API GATEWAY';
  private static readonly BORDER = '────────────────────────────────────────────────────────────';

  private static formatData(data: LogData): string {
    if (!data || Object.keys(data).length === 0) return '';

    const lines: string[] = [];

    for (const [key, value] of Object.entries(data)) {
      if (key === 'services' && Array.isArray(value)) {
        lines.push('services:');
        value.forEach((service: any) => {
          lines.push(`  • ${service.name.padEnd(8)} → ${service.status} (${service.latency}ms)`);
        });
      } else if (key === 'overall') {
        lines.push(`overall: ${value}`);
      } else if (typeof value === 'object' && value !== null) {
        lines.push(`${key}:`);
        for (const [subKey, subValue] of Object.entries(value)) {
          lines.push(`  ${subKey}: ${subValue}`);
        }
      } else {
        lines.push(`${key}: ${value}`);
      }
    }

    return '\n' + lines.join('\n');
  }

  private static log(level: string, emoji: string, message: string, data?: LogData) {
    const timestamp = new Date().toISOString();
    const dataStr = this.formatData(data || {});

    console.log(this.BORDER);
    console.log(`[${this.SERVICE_NAME}] ${emoji} ${timestamp}`);
    console.log(`[${level}] ${message}${dataStr}`);
    console.log(this.BORDER);
  }

  static info(message: string, data?: LogData) {
    this.log('INFO', '🧭', message, data);
  }

  static warn(message: string, data?: LogData) {
    this.log('WARN', '🟡', message, data);
  }

  static error(message: string, data?: LogData) {
    this.log('ERROR', '🔴', message, data);
  }

  static debug(message: string, data?: LogData) {
    this.log('DEBUG', '🐛', message, data);
  }

  static request(method: string, url: string, ip: string, duration?: number) {
    this.info('Request received', { request: `${method} ${url}`, ip, duration: duration ? `${duration}ms` : undefined });
  }

  static response(status: number, url: string, duration: number) {
    this.info('Response sent', { status, url, duration: `${duration}ms` });
  }

  static proxyRequest(service: string, url: string) {
    this.info(`Proxy request`, { service, url });
  }

  static dbConnection(status: 'success' | 'error', error?: any, latency?: number) {
    if (status === 'success') {
      this.info('Database connected', { db: 'mysql', latency: latency ? `${latency}ms` : undefined });
    } else {
      this.error('Database connection failed', { error });
    }
  }

  static serverStart(port: number, version?: string) {
    this.info('Service started', { port, version });
  }

  static healthCheckSummary(services: any[], overall: string, request: string, ip: string, duration: number) {
    this.info('Health check summary', {
      request,
      ip,
      duration: `${duration}ms`,
      services,
      overall: `✅ ${overall}`,
    });
  }
}
