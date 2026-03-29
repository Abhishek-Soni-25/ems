import supabase from "../config/supabase.js";

export async function get_events(req, res) {
    try {

        const today = new Date()
        const isoDate = today.toISOString().split("T")[0];

        const { data, error } = await supabase
        .from("events")
        .select()
        .gte("date", isoDate)

        if (error) {
            return res.status(400).json({message: "Failed to fetch events"})
        }

        return res.status(200).json(data)

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

        const { error } = await supabase
        .from("events")
        .insert({title: title, date: date, total_capacity: capacity, remaining_tickets: capacity})

        if (error) {
            return res.status(400).json({message: "Failed to store event"})
        }

        return res.status(201).json({message: "Event Stored Successfully"})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}