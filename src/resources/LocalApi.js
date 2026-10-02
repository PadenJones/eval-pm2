import { GenericJsonApi } from "@padenjones/utils";

const LocalApi = GenericJsonApi({
  name: "LocalApi",
  base: "http://localhost",
  port: process.env.PORT || 3000,
  routes: {
    health: {
      route: "/health",
    },
  },
});

export default LocalApi;
