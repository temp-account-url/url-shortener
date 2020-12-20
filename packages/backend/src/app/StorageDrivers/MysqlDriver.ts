/* istanbul ignore file */
/**
 * Coverage is disabled because this file/class is not designated for tests
 */
import * as mysql from "mysql2/promise";
import { Url } from "../Url";
import { RowDataPacket } from "mysql2/promise";
import { IStorageDriver } from "../interfaces/IStorageDriver";
import { Logger } from "../../common/Logger";

export default class MysqlDriver implements IStorageDriver {
    private connectionPool: mysql.Pool;

    constructor(private logger: Logger) {}

    async init() {
        this.connectionPool = await mysql.createPool({
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

        //testing connection
        await this.connectionPool.query("select 1");
        this.logger.debug("Mysql driver connected");
    }

    public findByUrl = async (url: Url): Promise<string | null> => {
        const parts = url.getParts();
        const isUrlSecure = parts.protocol === "https:";
        const restOfLink =
            (parts.pathname ?? "") +
            (parts.query ? "?" + parts.query : "") +
            (parts.hash ?? "");

        const domainQuery = await this.connectionPool.query<RowDataPacket[]>(
            "select slug from `links` where `host`=? and `is_secure`=? and `path`=?",
            [parts.hostname, isUrlSecure, restOfLink]
        );
        //similar link not found
        if (domainQuery[0].length === 1) {
            return domainQuery[0][0].slug;
        }
        return null;
    };

    public checkSlugExists = async (slug: string): Promise<boolean> => {
        const slugQuery = await this.connectionPool.query<RowDataPacket[]>(
            "select id from `links` where `slug`=?",
            [slug]
        );

        return slugQuery[0].length > 0;
    };

    public insertUrl = async (slug: string, url: Url) => {
        const parts = url.getParts();
        const isUrlSecure = parts.protocol === "https:";
        const restOfLink =
            (parts.pathname ?? "") + (parts.query ? "?" + parts.query : "") + (parts.hash ?? "");
        // domain not found
        await this.connectionPool.execute(
            "insert into `links` ( `slug`, `host`, `is_secure`, `path` ) values( ?, ? ,? ,? )",
            [slug, parts.hostname, isUrlSecure, restOfLink]
        );
    };

    public findBySlug = async (slug: string) => {
        return new Promise<string | null>((resolve) => {
            this.connectionPool
                .query<RowDataPacket[]>(
                    "select `host`, `is_secure`, `path` from `links` where `slug`=?",
                    [slug]
                )
                .then((result) => {
                    if (result[0].length === 1) {
                        const row = result[0][0];
                        let url =
                            "http" +
                            (row.is_secure ? "s" : "") +
                            "://" +
                            row.host +
                            row.path;
                        resolve(url);
                    } else {
                        resolve(null);
                    }
                });
        });
    };
}
