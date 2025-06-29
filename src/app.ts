import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from "./infra/http/routes/event.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", eventRoutes);


export default app;