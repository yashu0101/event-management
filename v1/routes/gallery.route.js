const router = require("express").Router();
const authorize = require("../../helpers/middlewear/authorize");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "images") cb(null, "uploads/gallery");
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
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGallery,
  getOneGallery,
} = require("../controllers/gallery.controller");

router.post("/", upload.array("images", 10), createGallery);
router.put("/:id", upload.array("images", 10), updateGallery);
router.delete("/:id", deleteGallery);
router.get("/:id", getOneGallery);
router.get("/", getAllGallery);

module.exports = router;
