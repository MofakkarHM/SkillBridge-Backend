import express, { Application } from "express";
import cors from "cors";
import { BookingRoutes } from "./modules/booking/booking.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { TutorRoutes } from "./modules/tutor/tutor.route";
import { UserRoutes } from "./modules/user/user.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/users", UserRoutes);
app.use("/api/tutors", TutorRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/bookings", BookingRoutes);
app.use("/api/reviews", ReviewRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API is Running!");
});

app.use(notFound);
app.use(errorHandler);

export default app;
