import { Express, Request, Response } from "express";
import { Logger } from "../../common/Logger";
import { errors } from "../../app/ErrorMessages";
import PersistenceLayer from "../../app/PersistenceLayer";

/**
 * When a user navigates to a shortened URL that they have been provided by the app (e.g. http://localhost:8080/h40Xg2)
 * they should be redirected to the original URL that yielded that short URL
 * (e.g https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8).
 *
 * @param app
 * @param persistenceLayer
 */
export const slugResolver = (
    app: Express,
    persistenceLayer: PersistenceLayer,
    logger: Logger
) => {
    app.get("/:slug", (req: Request, res: Response) => {
        const slug = req.params.slug;
        // building context for logger
        const logContext = {
            slug: slug,
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        };
        logger.debug("Url request", logContext);

        persistenceLayer
            .get(slug)
            .then((result) => {
                if (result === null) {
                    res.redirect("/not-found/" + slug);
                } else {
                    res.redirect(result);
                }
                res.end();
            })
            .catch((ex) => {
                // logger.critical(ex.toString(), logContext);
                res.end("Something went wrong.");
            });
    });
};
