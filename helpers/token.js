const jwt = require("jsonwebtoken");

//created token
const createToken = (payload = {}, expiry = 60 * 10) => {
  try {
    return jwt.sign(payload, "jdhfhfjkhsjdkj", { expiresIn: expiry });
  } catch (err) {
    console.error(err);
  }
};

//verfiy the Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, "jdhfhfjkhsjdkj");
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createToken, verifyToken };

// in future  if you want to cahnge key acces that key in environment and change
// expiry is in sec 10 minute 10*60=600sec
// if you want to pass kay from here then remove process.env.KEY then pass the KEY in form of string
// if you want to store token to session storage
// fist got app.js add app.use middlewear inthat pass function in that req,res,next
//second res.headers("Acccses -Control-Expose-Headers","x-accces-token" ) after that  called next
//third token print in under console.log(rsponse use in under response ) you will get token in console.log
// after that access that token from header or console
// then set to session storage
