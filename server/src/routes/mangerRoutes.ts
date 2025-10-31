import express from "express";
import {
  getManagerByCognitoId,
  createManager,
  updateManger,
} from "../controllers/managerController";
const router = express();

router.get("/:cognitoId", getManagerByCognitoId);
router.post("/", createManager);
router.put("/:cognitoId", updateManger);

export default router;
