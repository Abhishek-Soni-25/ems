import express from "express";
import { get_events, save_event, mark_attendance } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", get_events);
router.post("/", save_event);
router.post("/:id/attendance", mark_attendance);

export default router;