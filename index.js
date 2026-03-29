import express from 'express';
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(express.json())

app.use("/events", eventRoutes);
app.use("/user", bookingRoutes);

app.listen(8080, () => {
    console.log("Server listening")
});