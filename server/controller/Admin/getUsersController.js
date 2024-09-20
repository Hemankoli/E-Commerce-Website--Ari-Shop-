const pool = require("../../database/connection");

exports.getAllUsers = (req, res) => {
    pool.query("SELECT * FROM users;", (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};