const express = require("express");
const {
  generateNewShortUrl,
  getShortIdAndRedirect,
  getAnalytics,
  home,
} = require("./../controllers/linkController");

const router = express.Router();
router.route("/").get(home);
router.route("/short").post(generateNewShortUrl);
router.get("/:shortid", getShortIdAndRedirect);
router.get("/analytics", getAnalytics);

module.exports = router;
