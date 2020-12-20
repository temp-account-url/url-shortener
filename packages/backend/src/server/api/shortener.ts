import { Express, Request, Response } from "express";
import { Logger } from "../../common/Logger";
import { Url } from "../../app/Url";
import { errors } from "../../app/ErrorMessages";
import PersistenceLayer from "../../app/PersistenceLayer";

/**
 * When a user submits the form they should be presented with a simplified URL
 * of the form http://{domain}/{slug} (e.g. http://localhost:8080/h40Xg2).
 *
 * @param app
 * @param persistenceLayer
 */
export const shortener = (
    app: Express,
    persistenceLayer: PersistenceLayer,
    logger: Logger
) => {
    app.post("/", async (req: Request, res: Response) => {
        // building context for logger
        const logContext = {
            url: req.body.url,
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        };
        logger.debug("Shortening request", logContext);

        try {
            const url = new Url(req.body.url);

            if (url.getParts().hostname === req.hostname) {
                res.json(errors.self_link);
                return;
            }

            await persistenceLayer.persist(url).then((slug) => {
                res.json({
                    slug,
                });
            });
        } catch (ex) {
            // url is not valid
            if (ex.reason !== undefined) {
                logger.error("Not valid url", logContext);
                res.json(ex.reason);
            } else {
                logger.critical("Critical error", {
                    errorMsg: ex.toString(),
                    ...logContext,
                });

                res.json(errors.critical_error);
            }
        }
    });
};
