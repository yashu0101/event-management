const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const authorize = require("../../helpers/middlewear/authorize");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/venues");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const {
  createPayment,
  updatePayment,
  deletePayment,
  fetchOnePayment,
  fetchAllPayment,
} = require("../controllers/payment.controller");

router.post("/", upload.array("images", 10), createPayment);
router.put("/:id", upload.array("images", 10), updatePayment);
router.delete("/:id", deletePayment);
router.get("/:id", fetchOnePayment);
router.get("/", authorize(["superadmin", "admin"]), fetchAllPayment);

module.exports = router;
