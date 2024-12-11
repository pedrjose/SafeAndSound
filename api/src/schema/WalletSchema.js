import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  privateKey: {
    type: String,
    required: true,
  },
  publicAddress: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  securityPhrase: {
    type: Array,
    required: true,
  },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
