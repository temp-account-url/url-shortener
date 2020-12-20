import { Express } from "express";
import * as express from "express";
import { resolve } from "path";
import { Logger } from "../../common/Logger";

/**
 * UI view
 * @param app
 */
export const frontPage = (app: Express, _logger: Logger) => {
    app.use(express.static(resolve(__dirname, "../../../../frontend/build")));
};
