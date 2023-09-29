import mongoose from "mongoose";
import app from "./app.js";

const {DB_HOST} = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1);
  })
