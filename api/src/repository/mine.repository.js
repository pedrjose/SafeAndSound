import Block from "../schema/BlockSchema.js";

export const validateBlockRepository = () => Block.find();

export const deleteCacheBlock = (id) => Block.findByIdAndDelete(id);