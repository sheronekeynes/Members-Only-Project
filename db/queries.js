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

async function getUsersMessage() {
  const query = `SELECT clubuser.username,message.title,message.content,message.createdate,clubuser.membershipstatus,clubuser.admin
                 FROM clubuser inner join message on clubuser.id = message.userid`;

  const { rows } = await pool.query(query);

  return rows;
}

module.exports = {
  registerUsertoDB,
  findUserByUsername,
  getUsersMessage,
};
