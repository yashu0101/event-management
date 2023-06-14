const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./v1/models/db");
const port = process.env.PORT || 8888;
const app = express();
app.use(cors());
// to allow header to access token  use middlewear
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token");
  next();
});
// upload folder is public to kela tar images acces kelya jatel
app.use(express.static("uploads"));

app.use(bodyParser.json());

// app.use(path,middlewear)
app.use("/api/v1/users", require("./v1/routes/user.route"));
app.use("/api/v1/auth", require("./v1/routes/auth.route"));
app.use("/api/v1/event", require("./v1/routes/package.route"));
app.use("/api/v1/book", require("./v1/routes/eventBooking.route"));
app.use("/api/v1/venue", require("./v1/routes/venue.route"));
app.use("/api/v1/payment", require("./v1/routes/payment.route"));
app.use("/api/v1/gallery", require("./v1/routes/gallery.route"));
app.use("/api/v1/review", require("./v1/routes/reviews.router"));

app.listen(port, () => {
  console.log(`server is listing on port ${port}`);
});

// localhost:2222/api/v1/event
