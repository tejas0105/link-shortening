const express = require("express");
const {
  generateNewShortUrl,
  getShortIdAndRedirect,
  getAnalytics,
  postAlias,
  getAlias,
  home,
  // pushUrl,
} = require("./../controllers/linkController");

const router = express.Router();
router.route("/").get(home);
router.route("/short").post(generateNewShortUrl);
router.get("/:shortid", getShortIdAndRedirect);
router.get("/analytics/:shortid", getAnalytics);
router.route("/v1/alias").get(getAlias);
router.route("/alias").post(postAlias);
// router.route("/v1/pushUrl").post(pushUrl);

module.exports = router;
