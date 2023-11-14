import app from "./app.js";
import config from "./utils/config.js";

app.get("/", (_req, res) => res.send("Hello, World!"));

app.listen(config.PORT, () => {
  console.log(`Our server is now running on ${config.PORT}`);
});
