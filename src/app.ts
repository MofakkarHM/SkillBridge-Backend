import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { CategoryRoutes } from "./modules/category/category.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/categories", CategoryRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API is running");
});

export default app;
