"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDriver = void 0;
class DummyDriver {
    init() {
        return Promise.resolve(undefined);
    }
    checkSlugExists(slug) {
        if (slug === "xxx") {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    findBySlug(slug) {
        if (slug === "xxx") {
            return Promise.resolve("http://some-address.com/test");
        }
        return Promise.resolve(null);
    }
    findByUrl(url) {
        if (url.getParts().href == "http://some-address.com/test") {
            return Promise.resolve("xxx");
        }
        return Promise.resolve(undefined);
    }
    insertUrl(slug, url) {
        return Promise.resolve(undefined);
    }
}
exports.DummyDriver = DummyDriver;
//# sourceMappingURL=DummyDriver.js.map