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

  await pool.query(query, [
    fullname,
    username,
    password,
    membershipstatus,
    admin,
  ]);
}

async function findUserByUsername(username) {
  const query = "SELECT * FROM clubuser WHERE username = $1";

  const result = await pool.query(query, [username]);
  return result.rows[0];
}

module.exports = {
  registerUsertoDB,
  findUserByUsername,
};
