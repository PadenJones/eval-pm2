import LocalApi from "#src/resources/LocalApi.js";

describe("Server", () => {
  it("should return health stats", async () => {
    const { data } = await LocalApi.health();
    expect(data.status).toEqual("ok");
  });
});
