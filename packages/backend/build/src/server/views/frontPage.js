"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontPage = void 0;
const express = require("express");
const path_1 = require("path");
exports.frontPage = (app, _logger) => {
    app.use(express.static(path_1.resolve(__dirname, "../../../../frontend/build")));
};
//# sourceMappingURL=frontPage.js.map