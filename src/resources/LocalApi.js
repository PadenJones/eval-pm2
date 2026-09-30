import GenericJsonApi from "#src/helpers/GenericJsonApi.js";

const PORT = process.env.PORT || 3000;

const LocalApi = GenericJsonApi({
  name: "LocalApi",
  base: "http://localhost:" + PORT,
  routes: {
    health: {
      route: "/health",
    },
  },
});

export default LocalApi;
