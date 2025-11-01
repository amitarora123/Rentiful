import express from "express";
import {
  getManager,
  createManager,
  updateManger,
  getManagerProperties,
} from "../controllers/managerController";
const router = express();

router.get("/:cognitoId", getManager);
router.post("/", createManager);
router.put("/:cognitoId", updateManger);
router.post("/:cognitoId/properties", getManagerProperties);
export default router;
