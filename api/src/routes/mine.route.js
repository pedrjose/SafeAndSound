import { Router } from "express";
import { validateBlockController } from "../controllers/mine.controller.js";

const router = Router();

router.patch("/validate-block", validateBlockController);

export default router;
