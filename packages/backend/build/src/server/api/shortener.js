"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortener = void 0;
const tslib_1 = require("tslib");
const Url_1 = require("../../app/Url");
const ErrorMessages_1 = require("../../app/ErrorMessages");
exports.shortener = (app, persistenceLayer, logger) => {
    app.post("/", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const logContext = {
            url: req.body.url,
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        };
        logger.debug("Shortening request", logContext);
        try {
            const url = new Url_1.Url(req.body.url);
            if (url.getParts().hostname === req.hostname) {
                res.json(ErrorMessages_1.errors.self_link);
                return;
            }
            yield persistenceLayer.persist(url).then((slug) => {
                res.json({
                    slug,
                });
            });
        }
        catch (ex) {
            if (ex.reason !== undefined) {
                logger.error("Not valid url", logContext);
                res.json(ex.reason);
            }
            else {
                logger.critical("Critical error", Object.assign({ errorMsg: ex.toString() }, logContext));
                res.json(ErrorMessages_1.errors.critical_error);
            }
        }
    }));
};
//# sourceMappingURL=shortener.js.map