"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugResolver = void 0;
exports.slugResolver = (app, persistenceLayer, logger) => {
    app.get("/:slug", (req, res) => {
        const slug = req.params.slug;
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
            }
            else {
                res.redirect(result);
            }
            res.end();
        })
            .catch((ex) => {
            res.end("Something went wrong.");
        });
    });
};
//# sourceMappingURL=slugResolver.js.map