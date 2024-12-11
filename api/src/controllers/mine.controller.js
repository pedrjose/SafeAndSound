import { validateBlockService } from "../services/mine.service.js";

export async function validateBlockController(req, res) {
  const { minerWallet } = req.body;
  try {
    const validateBlock = await validateBlockService(minerWallet);

    res.status(201).send(validateBlock);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
