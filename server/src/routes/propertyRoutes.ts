import { Router } from "express";
import {
  getProperties,
  getProperty,
  createProperty,
} from "../controllers/propertyController";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";
import { getPropertyLeases } from "../controllers/leaseControllers";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);
router.get("/:id/leases", getPropertyLeases);
export default router;
