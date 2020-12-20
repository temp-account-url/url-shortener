import { Url } from "../Url";

export interface IStorageDriver {
    init: () => Promise<any>;
    findByUrl: (url: Url) => Promise<string | null>;
    findBySlug: (slug: string) => Promise<string | null>;
    checkSlugExists: (slug: string) => Promise<boolean>;
    insertUrl: (slug: string, url: Url) => Promise<any | null>;
}
