import { Router } from "express";

const router = Router();

import { createBlockController } from "../controllers/block.controller.js";

router.post("/create-block", createBlockController);

export default router;
