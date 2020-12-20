"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const UrlValidationError_1 = require("./UrlValidationError");
const validator = require("valid-url");
const ErrorMessages_1 = require("./ErrorMessages");
const NodeUrl = require("url");
class Url {
    constructor(url) {
        this.url = url;
        this.checkIsValid = () => {
            if (validator.isWebUri(this.url) === undefined) {
                throw new UrlValidationError_1.UrlValidationError(ErrorMessages_1.errors.url_not_valid);
            }
            if (this.getParts().auth !== null) {
                throw new UrlValidationError_1.UrlValidationError(ErrorMessages_1.errors.auth_data_not_acceptable);
            }
        };
        this.getParts = () => {
            return new NodeUrl.parse(this.url);
        };
        this.checkIsValid();
    }
}
exports.Url = Url;
//# sourceMappingURL=Url.js.map