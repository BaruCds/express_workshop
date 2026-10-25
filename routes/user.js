const express = require('express');
const user = express.Router();
const db = require('../config/database');


user.post("/", async (req, res, next) => {
    const { user_id, user_name, user_mail, user_password } = req.body;

    if ( user_name && user_mail && user_password) {
        let query = "INSERT INTO user (user_id, user_name, user_mail, user_password) ";
        query += `VALUES ('${user_id}', '${user_name}', '${user_mail}', '${user_password}')`;

        const rows = await db.query(query);

        if (rows.affectedRows === 1) {
            return res.status(201).json({ code: 201, message: "User created successfully" });
        }
        return res.status(500).json({ code: 500, message: "Error creating User" });
    }

    return res.status(400).json({ code: 400, message: "Missing user fields" });


});

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message:   rows });
});

module.exports = user;
