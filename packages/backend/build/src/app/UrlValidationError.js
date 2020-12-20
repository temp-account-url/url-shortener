"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlValidationError = void 0;
class UrlValidationError extends Error {
    constructor(_reason) {
        super(_reason.message);
        this._reason = _reason;
    }
    get reason() {
        return this._reason;
    }
}
exports.UrlValidationError = UrlValidationError;
//# sourceMappingURL=UrlValidationError.js.map