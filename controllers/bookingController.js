import pool from "../config/db.js";

export async function book_ticket(req, res) {
    const connection = await pool.getConnection();

    try {
        const user_id = req.params.id;
        const { event_id } = req.body;

        if (!event_id) {
            return res.status(400).json({message: "select the event"});
        }

        await connection.beginTransaction();

        const [events] = await connection.execute(
            "SELECT * FROM events WHERE id = ? FOR UPDATE",
            [event_id]
        );

        if (events.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Event not found" });
        }

        const event = events[0]

        if (event.remaining_tickets <= 0) {
            await connection.rollback()
            return res.status(400).json({message: "No tickets available"});
        }

        const today = new Date()
        const isoDate = today.toISOString().split("T")[0];

        await connection.execute(
            "INSERT INTO bookings (user_id, event_id, booking_date) VALUES (?, ?, ?)",
            [user_id, event_id, isoDate]
        );

        await connection.execute(
            "UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?",
            [event_id]
        );

        await connection.commit();

        const code = Math.random().toString(36).substring(2, 10).toUpperCase();

        return res.status(201).json({message: "Ticket booked successfully", code: code});

    } catch (err) {
        await connection.rollback();
        return res.status(500).json({message:"Internal Server Error"});
    } finally{
        connection.release();
    }
}

export async function get_user_bookings(req, res) {
    try {
        const user_id = req.params.id;

        const [rows] = await pool.execute(
            "SELECT * FROM bookings WHERE user_id = ?",
            [user_id]
        );

        rows.forEach(row => {
            row.booking_date = row.booking_date.toISOString().split("T")[0];
        });

        return res.status(200).json(rows);

    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}