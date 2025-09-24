export type LogLevel = "debug" | "info" | "warn" | "error"

type Logger = Record<LogLevel, (...args: unknown[]) => void>

const noop = () => {}

const consoleLogger: Logger = {
  debug: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[debug]", ...args)
    }
  },
  info: (...args) => console.info("[info]", ...args),
  warn: (...args) => console.warn("[warn]", ...args),
  error: (...args) => console.error("[error]", ...args),
}

export const logger: Logger = typeof window === "undefined" ? consoleLogger : consoleLogger

export const createScopedLogger = (scope: string): Logger => ({
  debug: (...args) => logger.debug(`[${scope}]`, ...args),
  info: (...args) => logger.info(`[${scope}]`, ...args),
  warn: (...args) => logger.warn(`[${scope}]`, ...args),
  error: (...args) => logger.error(`[${scope}]`, ...args),
})

export const silenceLogs = () => {
  logger.debug = noop
  logger.info = noop
  logger.warn = noop
  logger.error = noop
}
