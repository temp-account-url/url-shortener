import { IStorageDriver } from "../interfaces/IStorageDriver";
import { Url } from "../Url";

export class DummyDriver implements IStorageDriver {
    init(): Promise<any> {
        return Promise.resolve(undefined);
    }

    checkSlugExists(slug: string): Promise<boolean> {
        if (slug === "xxx") {
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }

    findBySlug(slug: string): Promise<string | null> {
        if (slug === "xxx") {
            return Promise.resolve("http://some-address.com/test");
        }
        return Promise.resolve(null);
    }

    findByUrl(url: Url): Promise<string | null> {
        if (url.getParts().href == "http://some-address.com/test") {
            return Promise.resolve("xxx");
        }

        return Promise.resolve(undefined);
    }

    insertUrl(slug: string, url: Url): Promise<any> {
        return Promise.resolve(undefined);
    }
}
