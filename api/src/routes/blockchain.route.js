import { Router } from "express";

const router = Router();

import { blockchainHistoryController } from "../controllers/blockchain.controller.js";

router.get("/history", blockchainHistoryController);

export default router;
