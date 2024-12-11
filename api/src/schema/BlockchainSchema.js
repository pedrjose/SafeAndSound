import mongoose from "mongoose";

const BlockchainSchema = new mongoose.Schema({
  blockchain: {
    type: Object,
    require: true,
  },
});

const Blockchain = mongoose.model("Blockchain", BlockchainSchema);

export default Blockchain;
