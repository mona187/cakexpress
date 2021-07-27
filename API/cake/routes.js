const express = require("express");

const {
  cakeFetch,
  deleteCake,
  updateCake,
  fetchCake,
} = require("./controllers");

const multer = require("multer");
const passport = require("passport");
const router = express.Router();

router.param("cakeId", async (req, res, next, cakeId) => {
  const cake = await fetchCake(cakeId, next);
  if (cake) {
    req.cake = cake;
    next();
  } else {
    const error = new Error("Cake Not Found.");
    error.status = 404;
    next(error);
  }
});

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });
// List Route
router.get("/", cakeFetch);

// Delete Route
router.delete(
  "/:cakeId",
  passport.authenticate("jwt", { session: false }),
  deleteCake
);

// Update Route
router.put(
  "/:cakeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateCake
);

module.exports = router;
