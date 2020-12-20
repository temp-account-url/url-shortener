import { Url } from "../../src/app/Url";
import PersistenceLayer from "../../src/app/PersistenceLayer";
import { DummyDriver } from "../../src/app/StorageDrivers/DummyDriver";

describe("Testing  persistence layer", () => {
    test("Test create but url already saved", async () => {
        let driver = new DummyDriver();
        //just to test this method
        await driver.init();
        let layer = new PersistenceLayer(driver);
        let slug = await layer.persist(new Url("http://some-address.com/test"));
        expect(slug).toEqual("xxx");
    });

    test("Test create  url ", async () => {
        let layer = new PersistenceLayer(new DummyDriver());
        let slug = await layer.persist(
            new Url("http://some-address.com/test?x=1")
        );
        expect(slug).not.toEqual("xxx");
    });

    test("Test get already save by slug ", async () => {
        let layer = new PersistenceLayer(new DummyDriver());
        let href = await layer.get("xxx");
        expect(href).toEqual("http://some-address.com/test");
    });

    test("Test get not saved domain ", async () => {
        let layer = new PersistenceLayer(new DummyDriver());
        let href = await layer.get("yyy");
        expect(href).toEqual(null);
    });

    test("Test exception if generated string exists 10 times in db", async () => {
        let layer = new PersistenceLayer(new DummyDriver());
        layer.generateNewSlug = () => {
            return "xxx";
        };
        expect.assertions(1);
        await layer
            .persist(new Url("http://some-address.com/new-page"))
            .then((result) => {})
            .catch((ex) => {
                expect(ex).toBeInstanceOf(Error);
            });
    });
});
