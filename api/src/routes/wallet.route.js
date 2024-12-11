import { Router } from "express";

const router = Router();

import {
  generateWalletController,
  getWalletTransactionHistoryController,
} from "../controllers/wallet.controller.js";

router.post("/generate-wallet", generateWalletController);
router.post("/history", getWalletTransactionHistoryController);

export default router;
