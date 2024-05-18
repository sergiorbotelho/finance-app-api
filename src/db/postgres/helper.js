/* eslint-disable no-undef */
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  database: "financeapp",
});

export const PostgresHelper = {
  query: async (query, params) => {
    const client = await pool.connect();

    const result = await client.query(query, params);
    return result.rows;
  },
};
