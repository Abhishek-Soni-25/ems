import fs from 'fs';
import YAML from 'yaml';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use(express.json())

app.use("/events", eventRoutes);
app.use("/user", bookingRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, () => {
    console.log("Server listening")
});