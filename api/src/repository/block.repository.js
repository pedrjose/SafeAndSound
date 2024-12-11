import Block from "../schema/BlockSchema.js";

export const createBlockRepository = (blockToMiner) =>
  Block.create(blockToMiner);
