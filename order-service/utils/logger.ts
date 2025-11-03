type LogData = Record<string, any>;

export class Logger {
  private static log(
    level: string,
    emoji: string,
    message: string,
    data?: LogData
  ) {
    const timestamp = new Date().toISOString();
    const dataStr = data
      ? ` | ${Object.entries(data)
          .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
          .join(", ")}`
      : "";
    console.log(
      `-[PRODUCT SERVICE]-: ${emoji} [${timestamp}] [${level}] ${message}${dataStr}`
    );
  }

  static info(message: string, data?: LogData) {
    this.log("INFO", "ℹ️", message, data);
  }
  static warn(message: string, data?: LogData) {
    this.log("WARN", "⚠️", message, data);
  }
  static error(message: string, data?: LogData) {
    this.log("ERROR", "❌", message, data);
  }
  static debug(message: string, data?: LogData) {
    if (process.env.NODE_ENV === "development")
      this.log("DEBUG", "🐛", message, data);
  }

  static request(method: string, url: string, ip: string) {
    this.info(`Request → ${method} ${url}`, { ip });
  }
  static response(status: number, url: string, duration: number) {
    this.log("RESPONSE", "✅", `${status} ${url} - ${duration}ms`);
  }
  static dbConnection(status: "success" | "error", error?: any) {
    if (status === "success") this.info("Database connected");
    else this.error("Database connection failed", { error });
  }
  static serverStart(port: number) {
    this.info(`Server running on port ${port}`);
  }
}
