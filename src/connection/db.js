const mongoose = require("mongoose");
require('dotenv').config()

MONGO_URL= process.env.MONGO_URL
const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL , {useNewUrlParser: true, useUnifiedTopology: true,
      autoIndex:true});
    console.log("DB Connected Successfully ✅");
  } catch (e) {
    console.log(`Authentication to database failed ❗`);
    
  }
};
module.exports = connectDB;
