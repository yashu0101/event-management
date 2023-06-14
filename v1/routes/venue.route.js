const router = require("express").Router();
const authorize = require("../../helpers/middlewear/authorize");
const multer = require("multer");
const path = require("path");
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
  createVenue,
  updateVenue,
  deleteVenue,
  fetchAllVenue,
  fetchOneVenue,
} = require("../controllers/venue.controller");

router.post("/", upload.array("images", 10), createVenue);
router.put("/:id", upload.array("images", 10), updateVenue);
router.delete("/:id", deleteVenue);
router.get("/:id", fetchOneVenue);
router.get("/", fetchAllVenue);

module.exports = router;
