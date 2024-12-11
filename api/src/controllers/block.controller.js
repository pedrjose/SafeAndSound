import { createBlockService } from "../services/block.service.js";

export async function createBlockController(req, res) {
  const { title, author, description, publicAddress, privateKey } = req.body;

  try {
    const create = await createBlockService(
      title,
      author,
      description,
      publicAddress,
      privateKey
    );

    res.status(201).send(create);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
