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
  createEvent,
  updateEvent,
  deleteEvent,
  getSingleEvent,
  getAllEvent,
} = require("../controllers/package.controller");

router.post("/", upload.array("images", 10), createEvent);
router.put("/:id", upload.array("images", 10), updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getSingleEvent);
router.get("/", getAllEvent);

module.exports = router;
