const UserModel = require("../models/user.model");
const { compareHash } = require("../../helpers/encrypt");
const { createToken, verifyToken } = require("../../helpers/token");
const UserCtr = require("../controllers/user.controller");
const { result } = require("lodash");
class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;
    // checking the email is available in databse in usermodel
    //first check whether the user with given email id is availabel
    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (!result) throw new Error("Invalid email");
        //then user is availabel then check password
        //compare password use the bcryptjs  package and use encryptfunction
        //compare plain password and encrypt password
        if (compareHash(password, result.password)) {
          //matched password
          const accessToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            10 * 60 // 10min
          );
          const refreshToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            25 * 60
          );
          //add token into response header
          res.set("x-access-token", accessToken);
          res.set("x-refresh-token", refreshToken);
          res.status(200).send({
            message: "login is succesful",
            data: UserCtr.pickUser(result),
          });
        } else {
          // if password is not match
          res.status(404).send({ message: "invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "invalid User and email is disable" });
      });
  } // UserlOgin
  static validateToken(req, res) {
    // accces token fron request body
    const token = req.headers.authorization;

    //verfiy token
    const payload = verifyToken(token);
    if (payload?._id) {
      // token is valid
      const { _id } = payload;
      // get the user document from db
      // to fecth user use model
      UserModel.findOne({ _id })
        .then((result) => {
          res
            .status(200)
            .send({ data: UserCtr.pickUser(result), message: "valid token" });
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Inavlid token");
        });
    } else {
      //invalid token
      res.status(403).send({ message: "Invalid token", error: null });
    }
  } // validate Tokent

  static refreshToken(req, res) {
    // access refresh and acces token from req.body
    const { refresh } = req.body;
    // verfiy the refresh token
    const payload = verifyToken(refresh);

    // if we get id from payload consider refresh token is valid
    if (payload?._id) {
      // refresh token valid then create acces token in that give role and id and time and after that again create new refersh token
      const accessT = createToken(
        { _id: payload?._id, role: payload?.role },
        10 * 60
      );
      const refreshT = createToken(
        { _id: payload?._id, role: payload?.role },
        25 * 60
      );

      res
        .status(200)
        .send({ data: { accessT, refreshT }, message: "Token created" });
    } else {
      //refresh token is invalid
      res.status(403).send({ message: "Session Expired", error: null });
    }
  }
}

module.exports = AuthCtrl;

// payload is object is given when token created in that we put id and role
