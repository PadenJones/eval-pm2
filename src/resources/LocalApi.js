import GenericJsonApi from "#src/helpers/GenericJsonApi.js";

const LocalApi = GenericJsonApi({
  name: "LocalApi",
  base: "http://localhost:3000",
  routes: {
    health: {
      route: "/health",
    },
  },
});

export default LocalApi;
