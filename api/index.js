const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route.js")
const userRoute = require("./routes/users.route.js")
const postRoute = require("./routes/posts.route.js");
const CategoryRoute = require("./routes/categories.route.js");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MONGODB!!"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req,body.name);
    },
  });

  const upload = multer({ storage: storage});
  app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded");
  });

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", CategoryRoute);



app.listen("8080", () => {
  console.log("Server is running!");
});
