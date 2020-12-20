import { Express, Request, Response } from "express";

import { Logger } from "../../common/Logger";
import * as fs from "fs";
import { resolve } from "path";

/**
 * UI view
 * @param app
 */
export const notFound = (app: Express, _logger: Logger) => {
    app.get("/not-found/:slug", (req: Request, res: Response) => {
        const content = fs.readFileSync(
            resolve(__dirname, "../../../../frontend/build/index.html")
        );
        res.end(content);
    });
};
