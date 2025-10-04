const { Client } = require("pg");
const bcrypt = require("bcrypt");

require("dotenv").config();
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS clubuser(
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                fullname VARCHAR(100) NOT NULL,
                                username VARCHAR(100) UNIQUE NOT NULL,
                                password VARCHAR(300) NOT NULL,
                                membershipstatus BOOLEAN DEFAULT false,
                                admin BOOLEAN DEFAULT false);`;

const createMessageTableQuery = `CREATE TABLE IF NOT EXISTS message(
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                title VARCHAR (255) NOT NULL,
                                content TEXT NOT NULL,
                                createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                userid UUID REFERENCES clubuser(id) ON DELETE CASCADE
                                );`;

async function populateUsers() {
  const users = [
    {
      fullname: "Guest User",
      username: "guest",
      password: "guest123",
      membershipstatus: false,
      admin: false,
    },
    {
      fullname: "Member User",
      username: "member",
      password: "member123",
      membershipstatus: true,
      admin: false,
    },
    {
      fullname: "Admin User",
      username: "admin",
      password: "admin123",
      membershipstatus: true,
      admin: true,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await client.query(
      `INSERT INTO clubuser (fullname, username, password, membershipstatus, admin)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING;`,
      [
        user.fullname,
        user.username,
        hashedPassword,
        user.membershipstatus,
        user.admin,
      ]
    );
  }

  console.log("Sample users added");
}

async function seed() {
  try {
    await client.connect();
    console.log("Database Connected...");

    await client.query(createUserTableQuery);
    await client.query(createMessageTableQuery);
    await populateUsers();
    console.log("seeding complete...");
  } catch (err) {
    console.log("error: ", err);
  } finally {
    await client.end();
  }
}

seed();
