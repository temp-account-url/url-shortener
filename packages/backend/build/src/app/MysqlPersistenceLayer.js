"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlPersistenceLayer = void 0;
const tslib_1 = require("tslib");
const mysql = require("mysql2/promise");
const nanoid_1 = require("nanoid");
class Mysql {
    constructor() {
        this.findByUrl = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const parts = url.getParts();
            const isUrlSecure = parts.protocol === "https:";
            const restOfLink = ((_a = parts.pathname) !== null && _a !== void 0 ? _a : "") + ((_b = parts.query) !== null && _b !== void 0 ? _b : "") + ((_c = parts.hash) !== null && _c !== void 0 ? _c : "");
            const domainQuery = yield this.connectionPool.query("select slug from `links` where `host`=? and `is_secure`=? and `path`=?", [parts.hostname, isUrlSecure, restOfLink]);
            if (domainQuery[0].length === 1) {
                return domainQuery[0][0].slug;
            }
            return null;
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
            return this.connectionPool.query("select 1");
        });
    }
}
class MysqlPersistenceLayer {
    constructor() {
        this.persist = (url) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const parts = url.getParts();
            const isUrlSecure = parts.protocol === "https:";
            const restOfLink = ((_a = parts.pathname) !== null && _a !== void 0 ? _a : "") + ((_b = parts.query) !== null && _b !== void 0 ? _b : "") + ((_c = parts.hash) !== null && _c !== void 0 ? _c : "");
            const domainQuery = yield this.connectionPool.query("select slug from `links` where `host`=? and `is_secure`=? and `path`=?", [parts.hostname, isUrlSecure, restOfLink]);
            if (domainQuery[0].length === 1) {
                return domainQuery[0][0].slug;
            }
            let potential = nanoid_1.nanoid(6);
            let slugExists = true;
            while (slugExists) {
                const slugQuery = yield this.connectionPool.query("select id from `links` where `slug`=?", [potential]);
                if (slugQuery[0].length === 0) {
                    slugExists = false;
                }
                else {
                    potential = nanoid_1.nanoid(6);
                }
            }
            yield this.connectionPool.execute("insert into `links` ( `slug`, `host`, `is_secure`, `path` ) values( ?, ? ,? ,? )", [potential, parts.hostname, isUrlSecure, restOfLink]);
            return potential;
        });
        this.get = (slug) => {
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
        };
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
            return this.connectionPool.query("select 1");
        });
    }
}
exports.MysqlPersistenceLayer = MysqlPersistenceLayer;
//# sourceMappingURL=MysqlPersistenceLayer.js.map