import express from "express";
import connectDatabase from "./database/db.js";
import { Blockchain } from "./models/blockchain.model.js";
import { corsAuth } from "./middleware/cors.middleware.js";

import walletRoute from "./routes/wallet.route.js";
import blockRoute from "./routes/block.routes.js";
import mineRoute from "./routes/mine.route.js";
import blockchainRoute from "./routes/blockchain.route.js";

const app = express();
const PORT = 3000;

connectDatabase();

export const blockchain = new Blockchain();

app.use(express.json());

app.use("/wallet", corsAuth, walletRoute);
app.use("/block", corsAuth, blockRoute);
app.use("/mine", corsAuth, mineRoute);
app.use("/blockchain", corsAuth, blockchainRoute);

app.listen(PORT, () => {
  console.log(`\nTHE 'SAFE & SOUND' BLOCKCHAIN NETWORK IS RUNNING ON PORT ${PORT}!`);
});