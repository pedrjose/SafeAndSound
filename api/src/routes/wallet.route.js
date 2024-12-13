import { Router } from "express";
import {
  generateWalletController,
  getWalletTransactionHistoryController,
} from "../controllers/wallet.controller.js";

const router = Router();

router.post("/generate-wallet", generateWalletController);
router.post("/history", getWalletTransactionHistoryController);

export default router;