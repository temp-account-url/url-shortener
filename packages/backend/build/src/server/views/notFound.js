"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const fs = require("fs");
const path_1 = require("path");
exports.notFound = (app, _logger) => {
    app.get("/not-found/:slug", (req, res) => {
        const content = fs.readFileSync(path_1.resolve(__dirname, "../../../../frontend/build/index.html"));
        res.end(content);
    });
};
//# sourceMappingURL=notFound.js.map