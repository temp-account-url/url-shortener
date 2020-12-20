"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nanoid_1 = require("nanoid");
class PersistenceLayer {
    constructor(storageDriver) {
        this.storageDriver = storageDriver;
        this.generateNewSlug = () => {
            return nanoid_1.nanoid(6);
        };
        this.persist = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let slug = this.generateNewSlug();
            const slugFromDb = yield this.storageDriver.findByUrl(url);
            if (slugFromDb) {
                return slugFromDb;
            }
            let counter = 0;
            while (yield this.storageDriver.checkSlugExists(slug)) {
                slug = this.generateNewSlug();
                if (++counter > 9) {
                    throw new Error("Critical: 10 slug generated exists in data store");
                }
            }
            yield this.storageDriver.insertUrl(slug, url);
            return slug;
        });
        this.get = (slug) => {
            return this.storageDriver.findBySlug(slug);
        };
    }
}
exports.default = PersistenceLayer;
//# sourceMappingURL=PersistenceLayer.js.map