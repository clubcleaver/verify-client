require("dotenv").config();
const { User } = require("./db.js");
const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(
    token.split(" ")[1],
    process.env.TOKEN_KEY,
    async (err, decoded) => {
      if (err) {
        req.userAuth = false;
        next();
      } else {
        const foundUser = await User.findOne({
          where: {
            email: decoded.email,
          },
        });
        if (foundUser) {
          req.userAuth = true;
          next();
        } else {
          req.userAuth = false;
          next();
        }
      }
    }
  );
  // if (tokenDecoded) {
  //   const foundUser = await User.findOne({
  //     where: {
  //       email: tokenDecoded.email,
  //     },
  //   });
  //   if (foundUser) {
  //     req.userAuth = true;
  //     next();
  //   } else {
  //     req.userAuth = false;
  //     next();
  //   }
  // } else {
  //   req.userAuth = false;
  //   next();
  // }
};

module.exports = {
  authCheck,
};
