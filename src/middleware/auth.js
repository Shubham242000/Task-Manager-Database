const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismystring");
    console.log(decoded);
    // console.log(token);
    const user = await User.findOne({
      _id: decoded._id,
      //   "tokens.token": token,
    });

    if (!user) throw new Error();

    req.user = user; // adding a property on the req so that route handler can access this user
    next(); // authorized .
  } catch (e) {
    res.status(401).json({ Error: "Please authenticate." });
  }
};
module.exports = auth;
