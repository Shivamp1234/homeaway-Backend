const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
    res.json("This is a test response!!!");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at port 4000`);
});