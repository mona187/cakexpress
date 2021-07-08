const express = require("express");

const {
  cakeFetch,
  deleteCake,
  createCake,
  updateCake,
  fetchCake,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

// param middleware (parameter)
router.param("cakeId", async (req, res, next, cakeId) => {
  const cake = await fetchCake(cakeId, next);
  if (cake) {
    // store it in req
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
router.delete("/:cakeId", deleteCake);
router.post("/", upload.single("image"), createCake);
// Update Route
router.put("/:cakeId", upload.single("image"), updateCake);

module.exports = router;
