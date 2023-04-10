const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const PORT = 3001;
app.use(cors())

app.use(express.json());

app.listen(PORT, () => {
    console.log("App is listening on 3001");
    console.log(`http://localhost:3001/`);
});
