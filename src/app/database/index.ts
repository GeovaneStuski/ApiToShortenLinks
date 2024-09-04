import dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

const host = process.env.HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const client = new Client({
  port: Number(port),
  host,
  database,
  user,
  password,
});

client.connect();

export const query = async (query: string, values?: string[]) => {
  const response = await client.query(query, values);

  return response.rows;
};