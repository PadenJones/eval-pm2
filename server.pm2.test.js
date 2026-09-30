import ecosystem from "./ecosystem.config.cjs";
import LocalApi from "#src/resources/LocalApi.js";

const app = ecosystem.apps.find((app) => (app.name = "eval-pm2"));

describe("Load Balancer", () => {
  it("should contain instances ... 0 through 3", async () => {
    const instances = await Promise.all(
      Array.from({ length: app.instances * 10 }, async () => {
        const { data } = await LocalApi.health();
        return data?.instance;
      }),
    );

    const uniqueInstances = Array.from(new Set(instances)).sort();

    expect(uniqueInstances).toEqual(
      expect.arrayContaining(
        Array.from({ length: app.instances }, (_, i) => String(i)),
      ),
    );
  });
});
