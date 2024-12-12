import Wallet from "../schema/WalletSchema.js";

export const generateWalletRepository = (wallet) => Wallet.create(wallet);

export const getWalletRepositoryForVerify = (publicAddress) =>
  Wallet.findOne({ publicAddress });

export const getWalletRepository = (publicAddress) =>
  Wallet.findOne({ publicAddress }, { securityPhrase: 0, privateKey: 0 });

export const updateWalletRepository = (
  publicAddress,
  walletWithUpdateBalance
) => {
  return Wallet.findOneAndUpdate(
    { publicAddress },
    { $set: walletWithUpdateBalance },
    { new: true }
  );
};
