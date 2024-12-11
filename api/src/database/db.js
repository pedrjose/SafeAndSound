import mongoose from "mongoose";

const connectDatabase = () => {
  console.log(`Wait: Connecting to the Database..`);

  mongoose
    .connect("mongodb+srv://teste:teste@cluster0.zzyh4.mongodb.net/")
    .then(() => console.log("\nDatabase Connected!"))
    .catch((error) => console.log(`\nCONNECTION ERROR: ${error}`));
};

export default connectDatabase;
