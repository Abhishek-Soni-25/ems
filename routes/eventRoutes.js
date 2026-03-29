import express from "express";
import { get_events, save_event } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", get_events);
router.post("/", save_event);

export default router;