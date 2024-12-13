import { mineBlock } from "../helpers/blockchain.helper.js";
import { generateHash } from "../helpers/blockchain.helper.js";
import { avoidForks } from "../helpers/blockchain.helper.js";

export function Blockchain(block) {
  this.block = block;
}

Blockchain.prototype.validateAndAddBlockToChain = function (block) {
  if (!avoidForks(block)) {
    throw new Error({
      message:
        "Essa transação possui risco de gerar uma bifurcação na blockchain, por isso, bloqueamos ela para manter o consenso da rede.",
    });
  }

  let currentBlock = this.block;
  let previousBlock = null;

  if (!this.block) {
    block.prevHash = 0;
    block.hash = mineBlock(block);
    this.block = block;
    return block.hash;
  } else {
    if (!this.block.next) {
      block.prevHash = this.block.hash;
      block.hash = mineBlock(block);
      this.block.next = block;
      return block.hash;
    } else {
      while (currentBlock) {
        if (!currentBlock.prevHash || currentBlock.prevHash === 0) {
          const prevHashingTest = generateHash(
            previousBlock.transaction.title,
            previousBlock.transaction.author,
            previousBlock.transaction.description,
            previousBlock.transaction.publicAddress,
            previousBlock.createdAt,
            previousBlock.hash,
            previousBlock.prevHash
          );

          if (prevHashingTest !== currentBlock.prevHash) {
            throw new Error("ERRO: falha ao verificar cadeia de blocos.");
          }
        }

        previousBlock = currentBlock;
        currentBlock = currentBlock.next;
      }

      block.prevHash = previousBlock.hash;
      block.hash = mineBlock(block);
      previousBlock.next = block;

      return block.hash;
    }
  }
};

Blockchain.prototype.getWalletTransactionHistory = function (publicAddress) {
  let node = this.block;
  let transactionHistory = [];

  while (node) {
    if (
      node.transaction.publicAddress === publicAddress ||
      node.minerRecord.miner === publicAddress
    ) {
      transactionHistory.push(node.hash);
    }

    node = node.next;
  }

  return transactionHistory;
};
