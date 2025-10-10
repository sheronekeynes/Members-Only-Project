require("dotenv").config();
const queries = require("../db/queries.js");

async function showJoinForm(req, res) {
  res.render("JoinForm", { errorMsg: null });
}

async function joinClub(req, res) {
  const { password, userId } = req.body;

  if (password !== process.env.MEMBERSECRETKEY) {
    return res.render("joinForm", { errorMsg: "Nope! Nice try" });
  }

  // add the user as a new member
  try {
    await queries.membershipPermission(userId);
    console.log("Membership updated successfully for user:", userId);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating membership:", err);
    res.render("JoinForm", { errorMsg: "Something went wrong. Try again!" });
  }
}

module.exports = {
  showJoinForm,
  joinClub,
};
