import { formatDate } from "../helpers/block.helpers.js";
import { getWalletRepository } from "../repository/wallet.repository.js";
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

  const wallet = await getWalletRepository(publicAddress);
  if (!wallet) {
    throw new Error(
      "ERRO: não foi encontrado nenhuma chave pública relativa ao endereço informado."
    );
  }

  if (wallet.balance < 1) {
    throw new Error(
      "ERRO: seu saldo é insuficiente para pagar as taxas de transação da Blockchain. Minere blocos para conseguir mais SND!"
    );
  }

  if (!validatePrivateKey(wallet.privateKey, privateKey)) {
    throw new Error("ERRO: assinatura de chave privada incorreta.");
  }

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
