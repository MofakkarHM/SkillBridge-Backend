import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { CategoryRoutes } from "./modules/category/category.route";
import { TutorRoutes } from "./modules/tutor/tutor.route";
import { BookingRoutes } from "./modules/booking/booking.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/categories", CategoryRoutes);

app.use("/api/tutors", TutorRoutes);

app.use("/api/bookings", BookingRoutes);

app.use("/api/reviews", ReviewRoutes);

app.use("/api/admin/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API is running");
});

export default app;
