import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Route imports

import tenantRoutes from "./routes/tenantRoutes";
import managerRoutes from "./routes/mangerRoutes";
import propertyRoutes from "./routes/propertyRoutes";

import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is home route");
});

// routes

app.use("/api/tenant", authMiddleware(["tenant"]), tenantRoutes);
app.use("/api/manager", authMiddleware(["manager"]), managerRoutes);
app.use("/api/properties", propertyRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Listening on http://localhost:${port}`);
});

export default app;
