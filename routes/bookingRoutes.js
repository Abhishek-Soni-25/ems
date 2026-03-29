import express from "express";
import { book_ticket, get_user_bookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/:id/book_ticket", book_ticket);
router.get("/:id/bookings", get_user_bookings);

export default router;