import supabase from "../config/supabase.js";

export async function book_ticket(req, res) {
    try {
        const user_id = req.params.id;
        const { event_id } = req.body;

        if (!event_id) {
            return res.status(400).json({message: "select the event"});
        }

        const { data: event, error: eventError } = await supabase
            .from("events")
            .select()
            .eq("id", event_id)
            .single();

        if (eventError) {
            return res.status(404).json({message: "Event not found"});
        }

        if (event.remaining_tickets <= 0) {
            return res.status(400).json({message: "No tickets available"});
        }

        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        const today = new Date()
        const isoDate = today.toISOString().split("T")[0];

        const { error: bookingError } = await supabase
            .from("bookings")
            .insert({user_id: user_id, event_id: event_id, booking_date: isoDate})

        if (bookingError) {
            return res.status(400).json({message: "Booking not saved"});
        }

        const { error: updateError } = await supabase
            .from("events")
            .update({remaining_tickets: event.remaining_tickets - 1})
            .eq("id", event_id);

        if (updateError) {
            return res.status(400).json({message: "Updation failed"});
        }

        return res.status(201).json({message: "Ticket booked successfully", code: code});

    } catch (err) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export async function get_user_bookings(req, res) {
    try {
        const user_id = req.params.id;

        const { data, error } = await supabase
            .from("bookings")
            .select()
            .eq("user_id", user_id);

        if (error) {
            return res.status(400).json({message: "Failed to fetch bookings"});
        }

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}