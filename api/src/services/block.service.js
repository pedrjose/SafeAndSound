import { formatDate } from "../helpers/block.helpers.js";
import {
  getWalletRepositoryForVerify,
  updateWalletRepository,
} from "../repository/wallet.repository.js";
import { validatePrivateKey } from "../helpers/wallet.helper.js";
import { createBlockRepository } from "../repository/block.repository.js";
import { BlockchainNode } from "../models/block.model.js";

export async function createBlockService(
  title,
  author,
  description,
  publicAddress,
  privateKey
) {
  if (!title || !author || !description) {
    throw new Error({
      message: "ERRO: preencha todos os campos necessários.",
    });
  }

  if (!publicAddress || !privateKey) {
    throw new Error({
      message:
        "ERRO: é necessário assinar o bloco com as suas chaves público-privada.",
    });
  }

  const wallet = await getWalletRepositoryForVerify(publicAddress);

  if (!wallet) {
    throw new Error({
      message:
        "ERRO: não foi encontrado nenhuma chave pública relativa ao endereço informado.",
    });
  }

  if (wallet.balance < 1) {
    throw new Error({
      message:
        "ERRO: seu saldo é insuficiente para pagar as taxas de transação da Blockchain. Minere blocos para conseguir mais SND!",
    });
  }

  const verify = await validatePrivateKey(wallet.privateKey, privateKey);

  if (!verify) {
    throw new Error({
      message: "ERRO: assinatura de chave privada incorreta.",
    });
  }

  wallet.balance -= 1;
  await updateWalletRepository(publicAddress, wallet);

  const transaction = {
    title,
    author,
    description,
    publicAddress,
    createdAt: formatDate(),
  };

  const newBlock = new BlockchainNode({
    title: transaction.title,
    author: transaction.author,
    description: transaction.description,
    publicAddress: transaction.publicAddress,
    createdAt: transaction.createdAt,
  });

  await createBlockRepository(newBlock);

  return {
    message:
      "Sua transação será adicionada na Blockchain assim que ela for minerada. Uma taxa de 1 SND será descontada da sua Wallet!",
  };
}
