import { blockchain } from "../index.js";
import {
  generateWalletRepository,
  getWalletRepository,
} from "../repository/wallet.repository.js";
import {
  generateWalletPublicAddress,
  generateWalletSecurityPhrase,
  encryptPrivateKey,
} from "../helpers/wallet.helper.js";

export async function generateWalletService(privateKey) {
  if (!privateKey) {
    throw new Error({
      message:
        "Não é possível criar uma SND Wallet sem chave privada. Tente novamente!",
    });
  }

  const newWallet = {
    privateKey: encryptPrivateKey(privateKey),
    publicAddress: generateWalletPublicAddress(),
    balance: Math.floor(Math.random() * (50 - 30 + 1)) + 30,
    securityPhrase: generateWalletSecurityPhrase(),
  };

  await generateWalletRepository(newWallet);

  return {
    message: `SND Wallet foi criada com sucesso!`,
    details: {
      publicKey: newWallet.publicAddress,
      publicAddressMessage: `Sua chave pública corresponde ao endereço '${newWallet.publicAddress}'.`,
      securityPhrase: `Sua frase de segurança é: ${newWallet.securityPhrase.join(
        ", "
      )}.`,
      balance: `Você ganhou ${newWallet.balance} SND para começar na plataforma.`,
    },
  };
}

export async function getWalletTransactionHistoryService(publicAddress) {
  if (!publicAddress) {
    throw new Error("Não é possível localizar essa carteira.");
  }

  const wallet = await getWalletRepository(publicAddress);
  const history = blockchain.getWalletTransactionHistory(publicAddress);

  return { wallet, history };
}
