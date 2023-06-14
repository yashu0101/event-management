const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Topper:Topper123@cluster0.zywqgwy.mongodb.net/?retryWrites=true&w=majority"
);

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connected to db");
});

conn.on("disconnected", () => {
  console.log("Disonnected from db");
});

conn.on("error", (err) => {
  console.log("could not connected ", err);
});
