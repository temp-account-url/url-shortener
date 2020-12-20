import { UrlValidationError } from "./UrlValidationError";
import * as validator from "valid-url";
import { errors } from "./ErrorMessages";
const NodeUrl = require("url");
export class Url {
    constructor(private url: string) {
        this.checkIsValid();
    }
    public checkIsValid = (): void => {
        if (validator.isWebUri(this.url) === undefined) {
            throw new UrlValidationError(errors.url_not_valid);
        }

        if (this.getParts().auth !== null) {
            throw new UrlValidationError(errors.auth_data_not_acceptable);
        }
    };

    public getParts = () => {
        return new NodeUrl.parse(this.url);
    };
}
