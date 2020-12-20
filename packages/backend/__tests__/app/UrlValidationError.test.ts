import { UrlValidationError } from "../../src/app/UrlValidationError";

describe("URL validation error", () => {
    test("Is it error?", () => {
        const reason = {
            message: "test message",
            errorCode: 200,
        };
        let instance = new UrlValidationError(reason);
        expect(instance).toBeInstanceOf(Error);

        expect(instance.reason).toEqual(reason);
    });
});
