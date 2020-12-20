import { Url } from "../../src/app/Url";
import { UrlValidationError } from "../../src/app/UrlValidationError";

describe("URL object test", () => {
    test("Check normal URL loads", () => {
        let url = "https://www.youtube.com/watch?v=eZeYVIWz99I/";
        const t = () => {
            new Url(url);
        };
        expect(t).not.toThrow(UrlValidationError);

        let urlHttps = "https://www.youtube.com/watch?v=eZeYVIWz99I/";
        const tHttps = () => {
            new Url(urlHttps);
        };
        expect(tHttps).not.toThrow(UrlValidationError);
    });

    test("Check reject if bad format", () => {
        let url = "asdkkasasd";
        const t = () => {
            new Url(url);
        };
        expect(t).toThrow(UrlValidationError);
    });

    test("Check reject if auth data", () => {
        let url = "https://auth:data@youtube.com/watch?v=eZeYVIWz99I/";
        const t = () => {
            new Url(url);
        };
        expect(t).toThrow(UrlValidationError);
    });
});
