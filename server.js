import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://livegp:nVXOubphr3jQ2O1z@cluster0.yd5j5qv.mongodb.net/?retryWrites=true&w=majority";
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
