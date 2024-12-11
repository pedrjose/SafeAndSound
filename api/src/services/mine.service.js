import { blockchain } from "../index.js";
import {
  validateBlockRepository,
  deleteCacheBlock,
} from "../repository/mine.repository.js";

export async function validateBlockService(minerWallet) {
  if (!minerWallet)
    throw new Error(
      "Informe sua chave pública ou caso contrário, você não será remunerado pela sua mineração."
    );

  const getBlocks = await validateBlockRepository();

  if (getBlocks.length === 0)
    return { message: "Sem mais blocos a serem minerados no momento!" };

  const block = getBlocks[Math.floor(Math.random() * getBlocks.length)];

  block.minerRecord = {
    miner: minerWallet,
    tax: "1 SND",
  };

  blockchain.validateAndAddBlockToChain(block);

  await deleteCacheBlock(block._id);

  return blockchain;
}
