import { Router } from "express";
import { getProperties } from "../controllers/propertyController";

const router = Router();

router.get("/", getProperties);

export default router;
