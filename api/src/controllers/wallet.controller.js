import {
  generateWalletService,
  getWalletTransactionHistoryService,
} from "../services/wallet.service.js";

export async function generateWalletController(req, res) {
  const { privateKey } = req.body;
  try {
    const generateWallet = await generateWalletService(privateKey);

    res.status(201).send(generateWallet);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getWalletTransactionHistoryController(req, res) {
  const { publicAddress } = req.body;
  try {
    const history = await getWalletTransactionHistoryService(publicAddress);

    res.status(201).send(history);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
