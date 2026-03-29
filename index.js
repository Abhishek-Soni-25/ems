import express from 'express';
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(express.json())

app.use("/events", eventRoutes);

app.listen(8080, () => {
    console.log("Server listening")
});