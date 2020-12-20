import { runServer } from "../../src/server/server";
import { Logger, LogLevel } from "../../src/common/Logger";
import PersistenceLayer from "../../src/app/PersistenceLayer";
import { DummyDriver } from "../../src/app/StorageDrivers/DummyDriver";
import { Url } from "../../src/app/Url";

const request = require("supertest");
let logger = new Logger();
logger.logLevel = LogLevel.never;
let app = runServer(new PersistenceLayer(new DummyDriver()), logger, -1);

describe("Testing server", () => {
    test("Testing main page", () => {
        expect.assertions(1);
        return request(app)
            .get("/")
            .expect(200)
            .then((response) => {
                expect(response.text.indexOf('"root"')).toBeGreaterThan(-1);
            });
    });

    test("Testing slug generation", () => {
        return request(app)
            .post("/")
            .send({ url: "http://some-address.com/test" })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body.slug).toEqual("xxx");
            });
    });

    test("Testing slug generation for the same domain", () => {
        return request(app)
            .post("/")
            .send({ url: "http://127.0.0.1/test" })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body.errorCode).toEqual(103);
            });
    });

    test("Testing link error", () => {
        return request(app)
            .post("/")
            .send({ url: "asdasdasdasd" })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body.errorCode).toEqual(100);
            });
    });

    test("Testing creator critical error", () => {
        const driver = new DummyDriver();
        driver.findByUrl = async (url: Url) => {
            throw "Mock error throwed by DummyDriver";
            return Promise.resolve("dummy");
        };

        const logger = new Logger();
        logger.logLevel = LogLevel.never;
        const newApp = runServer(new PersistenceLayer(driver), logger, -1);
        return request(newApp)
            .post("/")
            .send({ url: "http://domain.com/test" })
            .expect(200)
            .expect("Content-Type", /json/)
            .then((response) => {
                expect(response.body.errorCode).toEqual(99);
            });
    });
    test("Testing resolver critical error", () => {
        const driver = new DummyDriver();
        driver.findBySlug = async (slug: string) => {
            throw "Mock error throwed by DummyDriver";
            return Promise.resolve("dummy");
        };

        const logger = new Logger();
        //logger.logLevel = LogLevel.never;
        const newApp = runServer(new PersistenceLayer(driver), logger, -1);
        return request(newApp)
            .get("/yyyxx")
            .expect(200)
            .then((response) => {
                expect(response.text).toContain("Something went wrong.");
            });
    });

    test("Testing slug redirect and its exists in db", () => {
        return request(app)
            .get("/xxx")
            .expect(302)
            .then((response) => {
                expect(response.headers.location).toEqual(
                    "http://some-address.com/test"
                );
            });
    });

    test("Testing slug redirect and its not exists in db", () => {
        return request(app)
            .get("/yyy")
            .expect(302)
            .then((response) => {
                expect(response.headers.location).toEqual("/not-found/yyy");
            });
    });

    test("Testing not found", () => {
        return request(app)
            .get("/not-found/yyy")
            .expect(200)
            .then((response) => {
                // let traust frontend
                expect(response.text.indexOf('"root"')).toBeGreaterThan(-1);
            });
    });
});
