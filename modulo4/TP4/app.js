import express from "express";
import router from "./router/routes.js";
import { db } from "./config/index.js";

const app = express();
app.use(express.json());

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Successfully connected to mongodb!");
  } catch (error) {
    console.error(`There was an error connecting to mongodb ${error}`);
  }
})();

app.use("/", router);

app.listen(3000, () => {
  console.log("API running on port 3000...");
});
