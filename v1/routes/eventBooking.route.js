const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/events");
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
  createEventBooking,
  deleteEventBooking,
  updateEventBooking,
  fetchOneEventBooking,
  fetchAllEventBooking,
} = require("../controllers/eventbooking.controller");

router.post("/", upload.array("images", 10), createEventBooking);
router.put("/:id", upload.array("images", 10), updateEventBooking);
router.delete("/:id", deleteEventBooking);
router.get("/:id", fetchOneEventBooking);
router.get("/", fetchAllEventBooking);

module.exports = router;
