const { verifyToken } = require("../token");
// it is function return middlewear to check token  is vaild
// roles array madhe allowed roles milnar aahe
function authorize(roles = []) {
  return (req, res, next) => {
    // accces token fron request body from client side
    const token = req.headers.authorization;
    //verfiy token
    const payload = verifyToken(token);
    // console.log("Token:", token);
    // console.log("roles:", roles);
    // console.log("payload:", payload);

    if (payload?._id) {
      // token is valid
      // checking role which role we allowed to see the data
      const { _id, role } = payload;
      //if token valid
      // check role in allowed user
      if (roles.includes(role)) {
        next();
      } else {
        // no premission to acces current route
        res.status(401).send({
          message: "You do not have  permission to acces API",
          error: null,
        });
      }
    } else {
      // if token not valid
      // acces token expire if refresh token is valid then create new acces token if it is not valid the again relogin and genrate new token
      res.status(420).send({ message: " Access Token Expired", error: null });
    }
  };
}

module.exports = authorize;
