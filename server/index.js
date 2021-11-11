const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // allows us to access req.body

// routes

// create
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newToDo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newToDo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get

// update

// delete

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
