import dotnet from 'dotenv';
dotnet.config();

import express from 'express';
import { routes } from './routes';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`🔥 Server is running http://localhost:${port}`));