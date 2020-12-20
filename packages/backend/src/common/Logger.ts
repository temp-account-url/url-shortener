export enum LogLevel {
    debug,
    info,
    notice,
    warning,
    error,
    critical,
    alert,
    emergency,
    never,
}

const LogLevelNames = [
    "debug",
    "info",
    "notice",
    "warning",
    "error",
    "critical",
    "alert",
    "emergency",
];

export class Logger {
    private _logLevel = LogLevel.info;

    get logLevel(): LogLevel {
        return this._logLevel;
    }

    set logLevel(value: LogLevel) {
        this._logLevel = value;
    }

    constructor() {}

    public debug(msg: string, context: Record<string, any> | null = null) {
        this.out(LogLevel.debug, msg, context);
    }

    public info(msg: string, context: Record<string, any> | null = null) {
        this.out(LogLevel.info, msg, context);
    }

    public critical(msg: string, context: Record<string, any> | null = null) {
        this.out(LogLevel.critical, msg, context);
    }

    public error(msg: string, context: Record<string, any> | null = null) {
        this.out(LogLevel.error, msg, context);
    }

    private out(
        level: LogLevel,
        msg: string,
        context: Record<string, any> | string[] | null = null
    ) {
        if (level >= this._logLevel) {
            const entry = {
                level: LogLevelNames[level],
                date: new Date().toISOString(),
                msg,
                context: context ?? [],
            };
            console.log(entry);
        }
    }
}


