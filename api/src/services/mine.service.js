import { blockchain } from "../index.js";
import {
  validateBlockRepository,
  deleteCacheBlock,
} from "../repository/mine.repository.js";
import { getWalletRepositoryForVerify } from "../repository/wallet.repository.js";

export async function validateBlockService(minerWallet) {
  if (!minerWallet)
    throw new Error({
      message:
        "Informe sua chave pública ou caso contrário, você não será remunerado pela sua mineração.",
    });

  const findWalletMiner = await getWalletRepositoryForVerify(minerWallet);

  if (!findWalletMiner) throw new Error("ERRO: endereço de carteira inválida.");

  const getBlocks = await validateBlockRepository();

  if (getBlocks.length === 0)
    return { message: "Sem mais blocos a serem minerados no momento!" };

  const block = getBlocks[Math.floor(Math.random() * getBlocks.length)];

  block.minerRecord = {
    miner: minerWallet,
    tax: "1 SND",
  };

  const minedBlockHash = blockchain.validateAndAddBlockToChain(block);

  await deleteCacheBlock(block._id);

  return {
    message: `Bloco '${minedBlockHash}' minerado com sucesso. Foi pago o valor de 1 SND para sua carteira pelo seu trabalho!`,
  };
}
