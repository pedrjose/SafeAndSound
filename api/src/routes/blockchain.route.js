import { Router } from "express";
import { blockchainHistoryController } from "../controllers/blockchain.controller.js";

const router = Router();

router.get("/history", blockchainHistoryController);

export default router;
