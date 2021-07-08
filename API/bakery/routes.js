const express = require("express");
const multer = require("multer");
const {
  bakeryFetch,
  createBakery,
  createCake,
  fetchBakery,
} = require("./controllers");
const router = express.Router();

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// param middleware (parameter)
router.param("bakeryId", async (req, res, next, bakeryId) => {
  // get the bakery with id bakeryId
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    // store it in req
    req.bakery = bakery;
    next();
  } else {
    // give back response 404 Bakery Not Found
    const error = new Error("Bakery Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", bakeryFetch);

// Create Route
router.post("/", upload.single("image"), createBakery);

// Create Route
router.post("/:bakeryId/cakes", upload.single("image"), createCake);

module.exports = router;
