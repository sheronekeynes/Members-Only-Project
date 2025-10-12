// const pool = new Pool({
//   host: process.env.PGHOST,
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

const { Pool } = require("pg");

require("dotenv").config();

// Determine if we are in a production/deployed environment
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // CRITICAL FIX: Explicitly set rejectUnauthorized to true in production
  ssl: isProduction
    ? {
        rejectUnauthorized: true, // Secure connection required by Neon/Vercel
      }
    : false, // Allows local dev without SSL if DATABASE_URL isn't set, or if it's set but you're running locally.
});

module.exports = pool;
