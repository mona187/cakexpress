const express = require("express");

const slugify = require("slugify");
const {
  cakeFetch,
  deleteCake,
  createCake,
  updateCake,
} = require("./controllers");
const router = express.Router();
router.get("/", cakeFetch);
router.delete("/:cakeId", deleteCake);
router.post("/", createCake);
router.put("/:cakeId", updateCake);

module.exports = router;
