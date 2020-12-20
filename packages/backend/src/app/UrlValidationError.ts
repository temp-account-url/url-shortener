import { IErrorMessage } from "./interfaces/IErrorMessage";

export class UrlValidationError extends Error {
    constructor(private _reason: IErrorMessage) {
        super(_reason.message);
    }
    get reason(): IErrorMessage {
        return this._reason;
    }
}
