import crypto from "crypto";
import {
  getWalletRepositoryForVerify,
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

    if (block.hash.startsWith("0000")) {
      const minerWallet = await getWalletRepositoryForVerify(
        block.minerRecord.miner
      );
      const payerWallet = await getWalletRepositoryForVerify(
        block.transaction.publicAddress
      );

      if (payerWallet.balance < 1) {
        throw new Error({
          message: "Saldo insuficiente para realizar a transação.",
        });
      }

      payerWallet.balance -= 1;
      minerWallet.balance += 2;

      await updateWalletRepository(payerWallet.publicAddress, payerWallet);
      await updateWalletRepository(minerWallet.publicAddress, minerWallet);

      return block.hash;
    }

    block.nonce += 1;
  }
}

export function avoidForks(block) {
  return !block.next;
}

export function generateHash(...inputs) {
  return crypto.createHash("sha256").update(inputs.join("")).digest("hex");
}
