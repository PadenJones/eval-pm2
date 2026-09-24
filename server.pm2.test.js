import ecosystem from "./ecosystem.config.cjs";
import GenericJsonApi from "./src/helpers/GenericJsonApi";

const app = ecosystem.apps.find((app) => (app.name = "eval-pm2"));

const LocalApi = GenericJsonApi({
  base: `http://localhost:${app.env.PORT}`,
});

describe("Load Balancer", () => {
  it("should contain instances ... 0 through 3", async () => {
    const instances = await Promise.all(
      Array.from({ length: app.instances * 10 }, async () => {
        const { data } = await LocalApi({
          path: "/health",
          transformData: (data) => data.instance,
        });

        return data;
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
