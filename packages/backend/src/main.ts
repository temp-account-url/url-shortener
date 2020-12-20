/* istanbul ignore file */
/**
 * Coverage is disabled because this file/class is not designated for tests
 */
import { Logger, LogLevel } from "./common/Logger";
import { runServer } from "./server/server";
import PersistenceLayer from "./app/PersistenceLayer";
import MysqlDriver from "./app/StorageDrivers/MysqlDriver";

const logger = new Logger();

logger.logLevel = LogLevel.debug;
logger.debug("Starting backend package");

const driver = new MysqlDriver(logger);

driver
    .init()
    .then(() => {
        const persistenceLayer = new PersistenceLayer(driver);
        logger.debug("Connected to persistence layer");
        runServer(persistenceLayer, logger, 8080);
    })
    .catch((ex) => {
        logger.critical("Persistence layer error", { msg: ex.toString() });
    });
