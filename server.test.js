import LocalApi from "#src/resources/LocalApi.js";

describe("Server", () => {
  it("should return health stats", async () => {
    const { data } = await LocalApi.health();

    console.log("data: ", data);
  });
});
