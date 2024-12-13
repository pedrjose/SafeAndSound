import { Router } from "express";
import { createBlockController } from "../controllers/block.controller.js";

const router = Router();

router.post("/create-block", createBlockController);

export default router;
