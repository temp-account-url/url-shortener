import * as express from "express";
import * as bodyParser from "body-parser";
import { Logger } from "../common/Logger";

import { frontPage } from "./views/frontPage";
import { shortener } from "./api/shortener";
import { slugResolver } from "./api/slugResolver";
import { notFound } from "./views/notFound";
import * as cors from "cors";
import PersistenceLayer from "../app/PersistenceLayer";
import * as core from "express-serve-static-core";

export const runServer = (
    persistenceLayer: PersistenceLayer,
    logger: Logger,
    port: number
): core.Express => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    // page with form
    frontPage(app, logger);

    // slug not found page
    notFound(app, logger);

    // api for slug shortening
    shortener(app, persistenceLayer, logger);

    // redirect to target address by given slug
    slugResolver(app, persistenceLayer, logger);

    //test dont need port listening
    if (port != -1) {
        app.listen(port, () => {
            logger.debug(`App is listening http://localhost:${port}`);
        });
    }

    return app;
};
