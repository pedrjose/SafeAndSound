import crypto from "crypto";
import {
  getWalletRepository,
  updateWalletRepository,
} from "../repository/wallet.repository.js";

export async function mineBlock(block) {
  block.nonce = 0;

  while (true) {
    block.hash = generateHash(
      block.transaction.title,
      block.transaction.author,
      block.transaction.description,
      block.transaction.publicAddress,
      block.createdAt,
      block.hash,
      block.prevHash
    );

    if (block.hash.startsWith("0".repeat(4))) {
      const minerWallet = await getWalletRepository(block.minerRecord.miner);
      const payerWallet = await getWalletRepository(
        block.transaction.publicAddress
      );

      if (payerWallet.balance < 1) {
        throw new Error("Saldo insuficiente para realizar a transação.");
      }

      payerWallet.balance -= 1;
      minerWallet.balance += 1;

      await updateWalletRepository(payerWallet.publicAddress, payerWallet);
      await updateWalletRepository(minerWallet.publicAddress, minerWallet);

      return block.hash;
    }

    block.nonce += 1;
  }
}

export function generateHash(...inputs) {
  return crypto.createHash("sha256").update(inputs.join("")).digest("hex");
}
