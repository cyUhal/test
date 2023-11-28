const express = require("express");
const cors = require("cors");
const connectDB = require("./src/connection/db");
require('dotenv').config()

const controllers = require("./src/controllers");
const verifyToken = require("./src/middleware/verifyToken");


const app = express(); 

app.use(cors());
app.use(express.json());

app.get("/user", verifyToken, controllers.getUserById);
app.post("/register", controllers.register);
app.post("/login", controllers.login);

app.get("/", (req, res) => {
  res.send('hello')
})




// const PORT = 88 || process.env.PORT

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDB()
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function () {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
