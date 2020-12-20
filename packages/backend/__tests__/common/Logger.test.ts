import Mock = jest.Mock;
import { Logger, LogLevel } from "../../src/common/Logger";

describe("Logger  test", () => {
    const log = console.log; // save original console.log function
    let logger: Logger;
    beforeEach(() => {
        console.log = jest.fn(); // create a new mock function for each test
        logger = new Logger();
        logger.logLevel = LogLevel.debug;
    });
    afterAll(() => {
        console.log = log; // restore original console.log after all tests
    });

    test("Test debug without context", () => {
        logger.debug("debug-message");
        expect(console.log).toHaveBeenCalled();
        const message = (console.log as Mock).mock.calls[0][0];
        expect(message.level).toEqual("debug");
        expect(message.msg).toEqual("debug-message");
        expect(message.context).toEqual([]);
    });
    test("Test info without context", () => {
        logger.info("info-message");
        expect(console.log).toHaveBeenCalled();
        const message = (console.log as Mock).mock.calls[0][0];
        expect(message.level).toEqual("info");
        expect(message.msg).toEqual("info-message");
        expect(message.context).toEqual([]);
    });
    test("Test error without context", () => {
        logger.error("error-message");
        expect(console.log).toHaveBeenCalled();
        const message = (console.log as Mock).mock.calls[0][0];
        expect(message.level).toEqual("error");
        expect(message.msg).toEqual("error-message");
        expect(message.context).toEqual([]);
    });
    test("Test critical without context", () => {
        logger.critical("critical-message");
        expect(console.log).toHaveBeenCalled();
        const message = (console.log as Mock).mock.calls[0][0];
        expect(message.level).toEqual("critical");
        expect(message.msg).toEqual("critical-message");
        expect(message.context).toEqual([]);
    });
    test("Test info with context", () => {
        logger.info("info-message", { label: "test-value" });
        const message = (console.log as Mock).mock.calls[0][0];
        expect(message.context).toEqual({ label: "test-value" });
    });

    test("Set and get log level", () => {
        logger.logLevel = LogLevel.critical;
        expect(logger.logLevel).toEqual(LogLevel.critical);
    });

    test("Test log level", () => {
        logger.logLevel = LogLevel.info;
        logger.debug("message");
        expect(console.log).not.toHaveBeenCalled();
        logger.logLevel = LogLevel.error;
        logger.info("message");
        expect(console.log).not.toHaveBeenCalled();
        logger.logLevel = LogLevel.critical;
        logger.error("message");
        expect(console.log).not.toHaveBeenCalled();
    });
});
// describe("Logger error test", () => {});
// describe("Logger critical test", () => {});
//
// describe("Logger level", () => {});
