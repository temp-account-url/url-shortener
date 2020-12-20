import { Url } from "./Url";
import { nanoid } from "nanoid";
import { IStorageDriver } from "./interfaces/IStorageDriver";

export default class PersistenceLayer {
    constructor(private storageDriver: IStorageDriver) {}

    public generateNewSlug = () => {
        return nanoid(6);
    };

    public persist = async (url: Url): Promise<string> => {
        let slug = this.generateNewSlug();
        const slugFromDb = await this.storageDriver.findByUrl(url);
        if (slugFromDb) {
            return slugFromDb;
        }

        let counter = 0;
        while (await this.storageDriver.checkSlugExists(slug)) {
            slug = this.generateNewSlug();
            if (++counter > 9) {
                throw new Error(
                    "Critical: 10 slug generated exists in data store"
                );
            }
        }

        await this.storageDriver.insertUrl(slug, url);
        return slug;
    };

    public get = (slug: string): Promise<string | null> => {
        return this.storageDriver.findBySlug(slug);
    };
}
