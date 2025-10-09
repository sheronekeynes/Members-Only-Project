require("dotenv").config();

async function showJoinForm(req, res) {
  res.send("i will show you the join form");
}

module.exports = {
  showJoinForm,
};
