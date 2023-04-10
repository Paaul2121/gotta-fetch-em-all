const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const { MONGO_URL } = process.env;
if (!MONGO_URL) {
    console.error("CHEY ERROR")
    process.exit(1);
 }



const cors = require("cors");
const PORT = 3001;
app.use(cors())

app.use(express.json());


const main = async () => {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
      console.log("App is listening on 3001");
      console.log(`http://localhost:3001/`);
    });

}
main().catch(err => {
    console.error(err)
    process.exit(1);
})