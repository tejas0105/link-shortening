const express = require("express");
const {
  generateNewShortUrl,
  getShortIdAndRedirect,
  getAnalytics,
  getAlias,
  home,
} = require("./../controllers/linkController");

const router = express.Router();
router.route("/").get(home);
router.route("/short").post(generateNewShortUrl);
router.get("/:shortid", getShortIdAndRedirect);
router.get("/analytics/:shortid", getAnalytics);
router.get("/analytics/:shortid", getAlias);

module.exports = router;
