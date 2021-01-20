import mongoose from "mongoose";

export function mongoConnect() {
  return mongoose
    .connect(process.env.KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((mongodb) => {
      console.log("mongo connected");
      return mongodb;
    })
    .catch((err) => {
      console.log("mongo error");
      return err;
    });
}
