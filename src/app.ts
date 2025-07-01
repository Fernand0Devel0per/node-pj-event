import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from "./infra/http/routes/event.routes";
import userRoutes from './infra/http/routes/user.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", eventRoutes);
app.use("/api/users", userRoutes);


export default app;