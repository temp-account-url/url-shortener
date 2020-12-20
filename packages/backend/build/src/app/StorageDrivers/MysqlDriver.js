"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql = require("mysql2/promise");
class MysqlDriver {
    constructor(logger) {
        this.logger = logger;
        this.findByUrl = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const parts = url.getParts();
            const isUrlSecure = parts.protocol === "https:";
            const restOfLink = ((_a = parts.pathname) !== null && _a !== void 0 ? _a : "") +
                (parts.query ? "?" + parts.query : "") +
                ((_b = parts.hash) !== null && _b !== void 0 ? _b : "");
            const domainQuery = yield this.connectionPool.query("select slug from `links` where `host`=? and `is_secure`=? and `path`=?", [parts.hostname, isUrlSecure, restOfLink]);
            if (domainQuery[0].length === 1) {
                return domainQuery[0][0].slug;
            }
            return null;
        });
        this.checkSlugExists = (slug) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugQuery = yield this.connectionPool.query("select id from `links` where `slug`=?", [slug]);
            return slugQuery[0].length > 0;
        });
        this.insertUrl = (slug, url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            const parts = url.getParts();
            const isUrlSecure = parts.protocol === "https:";
            const restOfLink = ((_c = parts.pathname) !== null && _c !== void 0 ? _c : "") + (parts.query ? "?" + parts.query : "") + ((_d = parts.hash) !== null && _d !== void 0 ? _d : "");
            yield this.connectionPool.execute("insert into `links` ( `slug`, `host`, `is_secure`, `path` ) values( ?, ? ,? ,? )", [slug, parts.hostname, isUrlSecure, restOfLink]);
        });
        this.findBySlug = (slug) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.connectionPool
                    .query("select `host`, `is_secure`, `path` from `links` where `slug`=?", [slug])
                    .then((result) => {
                    if (result[0].length === 1) {
                        const row = result[0][0];
                        let url = "http" +
                            (row.is_secure ? "s" : "") +
                            "://" +
                            row.host +
                            row.path;
                        resolve(url);
                    }
                    else {
                        resolve(null);
                    }
                });
            });
        });
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.connectionPool = yield mysql.createPool({
                host: process.env.MYSQL_DATABASE_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                port: 3306,
                database: process.env.MYSQL_DATABASE,
                waitForConnections: true,
                connectionLimit: 40,
                queueLimit: 0,
                connectTimeout: 10000,
            });
            yield this.connectionPool.query("select 1");
            this.logger.debug("Mysql driver connected");
        });
    }
}
exports.default = MysqlDriver;
//# sourceMappingURL=MysqlDriver.js.map