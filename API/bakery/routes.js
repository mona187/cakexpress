const express = require("express");
const multer = require("multer");
const passport = require("passport");
const {
  bakeryFetch,
  createBakery,
  createCake,
  fetchBakery,
} = require("./controllers");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const error = new Error("Bakery Not Found.");
    error.status = 404;
    next(error);
  }
});

router.get("/", bakeryFetch);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createBakery
);

// Create Route
router.post(
  "/:bakeryId/cakes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createCake
);

module.exports = router;
