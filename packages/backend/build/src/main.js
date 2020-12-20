"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./common/Logger");
const server_1 = require("./server/server");
const PersistenceLayer_1 = require("./app/PersistenceLayer");
const MysqlDriver_1 = require("./app/StorageDrivers/MysqlDriver");
const logger = new Logger_1.Logger();
logger.logLevel = Logger_1.LogLevel.debug;
logger.debug("Starting backend package");
const driver = new MysqlDriver_1.default(logger);
driver
    .init()
    .then(() => {
    const persistenceLayer = new PersistenceLayer_1.default(driver);
    logger.debug("Connected to persistence layer");
    server_1.runServer(persistenceLayer, logger, 8080);
})
    .catch((ex) => {
    logger.critical("Persistence layer error", { msg: ex.toString() });
});
//# sourceMappingURL=main.js.map