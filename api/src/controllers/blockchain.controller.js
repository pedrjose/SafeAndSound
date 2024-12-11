import { blockchain } from "../index.js";

export function blockchainHistoryController(req, res) {
  try {
    res.status(201).send(blockchain);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
