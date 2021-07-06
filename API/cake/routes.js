const express = require("express");

const slugify = require("slugify");
const {
  cakeFetch,
  deleteCake,
  createCake,
  updateCake,
  fetchCake,
} = require("./controllers");
const router = express.Router();

// param middleware
router.param("cakeId", async (req, res, next, cakeId) => {
  // get the cake with id cakeId

  const cake = await fetchCake(cakeId, next);
  if (cake) {
    req.cake = cake;
    next();
  } else {
    const error = new Error("Cake Not Found");
    error.status = 404;
    next(error);
  }
});
router.get("/", cakeFetch);
router.delete("/:cakeId", deleteCake);
router.post("/", createCake);
router.put("/:cakeId", updateCake);

module.exports = router;
