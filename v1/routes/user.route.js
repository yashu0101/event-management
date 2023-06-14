const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { validate } = require("../../helpers/middlewear/user.validation");
const authorize = require("../../helpers/middlewear/authorize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "avatar") cb(null, "uploads/users-avatar");
    else if (file.fieldname == "idDoc") cb(null, "uploads/users-id");
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
  createUser,
  updateUser,
  deleteUser,
  fetchOneUser,
  fetchAllUser,
  updateDeleteImages,
  userStatistic,
} = require("../controllers/user.controller");

router.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validate,
  createUser
);
router.put(
  "/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validate,
  // authorize is a function middlewear is inside function so you called authorize then it will give an middlewear
  authorize(["superadmin", "admin", "customer"]),
  updateUser
);
router.delete("/:id", authorize(["superadmin", "admin"]), deleteUser);
router.get("/statistics", authorize(["superadmin", "admin"]), userStatistic);
router.get(
  "/:id",
  authorize(["superadmin", "admin", "customer"]),
  fetchOneUser
);
router.get("/", authorize(["superadmin", "admin"]), fetchAllUser);
router.put(
  "/image/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validate,
  authorize(["superadmin", "admin", "customer"]),
  updateDeleteImages
);

module.exports = router;
