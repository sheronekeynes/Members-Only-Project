const { use } = require("passport");
const pool = require("./pool");

// register user

async function registerUsertoDB(
  fullname,
  username,
  password,
  membershipstatus,
  admin
) {
  const query = `INSERT INTO clubuser (fullname,username,password,membershipstatus,admin)
                   VALUES($1,$2,$3,$4,$5)`;
  try {
    await pool.query(query, [
      fullname,
      username,
      password,
      membershipstatus,
      admin,
    ]);
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL duplicate key error code
      throw new Error("Username already exists!");
    }
    throw err;
  }
}

async function findUserByUsername(username) {
  const query = "SELECT * FROM clubuser WHERE username = $1";

  const result = await pool.query(query, [username]);
  return result.rows[0];
}

async function getUsersMessage() {
  const query = `SELECT clubuser.username,message.content,message.createdate,clubuser.membershipstatus,clubuser.admin
                 FROM clubuser inner join message on clubuser.id = message.userid`;

  const { rows } = await pool.query(query);

  return rows;
}

async function membershipPermission(userId) {
  const query = `UPDATE clubuser 
                 SET membershipstatus = true
                 where id=$1`;

  await pool.query(query, [userId]);
}

async function addMessage(content, userId) {
  const query = `INSERT INTO message (content, userid)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING;`;

  await pool.query(query, [content, userId]);
}

module.exports = {
  registerUsertoDB,
  findUserByUsername,
  getUsersMessage,
  membershipPermission,
  addMessage,
};
