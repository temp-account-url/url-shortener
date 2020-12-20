"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["debug"] = 0] = "debug";
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["notice"] = 2] = "notice";
    LogLevel[LogLevel["warning"] = 3] = "warning";
    LogLevel[LogLevel["error"] = 4] = "error";
    LogLevel[LogLevel["critical"] = 5] = "critical";
    LogLevel[LogLevel["alert"] = 6] = "alert";
    LogLevel[LogLevel["emergency"] = 7] = "emergency";
    LogLevel[LogLevel["never"] = 8] = "never";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
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
class Logger {
    constructor() {
        this._logLevel = LogLevel.info;
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(value) {
        this._logLevel = value;
    }
    debug(msg, context = null) {
        this.out(LogLevel.debug, msg, context);
    }
    info(msg, context = null) {
        this.out(LogLevel.info, msg, context);
    }
    critical(msg, context = null) {
        this.out(LogLevel.critical, msg, context);
    }
    error(msg, context = null) {
        this.out(LogLevel.error, msg, context);
    }
    out(level, msg, context = null) {
        if (level >= this._logLevel) {
            const entry = {
                level: LogLevelNames[level],
                date: new Date().toISOString(),
                msg,
                context: context !== null && context !== void 0 ? context : [],
            };
            console.log(entry);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map