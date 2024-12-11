import { Router } from "express";

const router = Router();

import { validateBlockController } from "../controllers/mine.controller.js";

router.patch("/validate-block", validateBlockController);

export default router;
