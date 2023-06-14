const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const authorize = require("../../helpers/middlewear/authorize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/reviews");
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
  createReviews,
  updateReviews,
  deleteReview,
  fetchOneReview,
  fetchAllReview,
} = require("../controllers/customerreviews.controller");

router.post("/", upload.array("images", 10), createReviews);
router.put(
  "/:id",
  authorize(["superadmin", "admin"]),
  upload.array("images", 10),
  updateReviews
);
router.delete("/:id", authorize(["superadmin", "admin"]), deleteReview);
router.get("/:id", fetchOneReview);
router.get("/", fetchAllReview);

module.exports = router;
