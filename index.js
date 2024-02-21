const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const user = require("./model/User");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const bcryptSalt = bcrypt.genSaltSync(10);

mongoose.connect(process.env.MONGODB_URL);

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDetails = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDetails);
    } catch (error) {
        res.status(422).json(error);
    }

});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at port 4000`);
});