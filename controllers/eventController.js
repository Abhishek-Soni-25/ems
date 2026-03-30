import pool from "../config/db.js";

export async function get_events(req, res) {
    try {

        const today = new Date()
        const isoDate = today.toISOString().split("T")[0];

        const [rows] = await pool.execute(
            "SELECT * FROM events WHERE date >= ?",
            [isoDate]
        );

        return res.status(200).json(rows)

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export async function save_event(req, res) {
    try {

        const {title, date, capacity} = req.body;

        if(!title || !date || !capacity) {
            return res.status(400).json({message: "All fields are required"})
        }

        await pool.execute(
            `INSERT INTO events (title, date, total_capacity, remaining_tickets)
            VALUES (?, ?, ?, ?)`,
            [title, date, capacity, capacity]
        );

        return res.status(201).json({message: "Event Stored Successfully"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}