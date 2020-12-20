"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const frontPage_1 = require("./views/frontPage");
const shortener_1 = require("./api/shortener");
const slugResolver_1 = require("./api/slugResolver");
const notFound_1 = require("./views/notFound");
const cors = require("cors");
exports.runServer = (persistenceLayer, logger, port) => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    frontPage_1.frontPage(app, logger);
    notFound_1.notFound(app, logger);
    shortener_1.shortener(app, persistenceLayer, logger);
    slugResolver_1.slugResolver(app, persistenceLayer, logger);
    if (port != -1) {
        app.listen(port, () => {
            logger.debug(`App is listening http://localhost:${port}`);
        });
    }
    return app;
};
//# sourceMappingURL=server.js.map