const ShortUrl = require("./../model/url");
const shortid = require("shortid");

const home = async (req, res) => {
  const result = await ShortUrl.find();
  res.status(200).json({
    status: "success",
    data: { results: result.length, result },
  });
};

const generateNewShortUrl = async (req, res) => {
  const shortId = shortid();
  const link = process.env.baseURL + "/" + shortId;
  const body = req.body;
  if (!body.url)
    return res
      .status(400)
      .json({ status: "failed", message: "url is requrired" });
  const shortLink = await ShortUrl.findOne({
    redirectURL: req.body.url,
  });
  if (shortLink)
    return res.status(201).json({
      data: { shortURL: shortLink.shortId, originalURL: shortLink.redirectURL },
    });
  const url = await ShortUrl.create({
    code: shortId,
    shortId: link,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(201).json({
    status: "success",
    data: { shortURL: url.shortId, originalURL: url.redirectURL },
  });
};

const getShortIdAndRedirect = async (req, res) => {
  const shortId = req.params.shortid;
  if (!shortid)
    return res
      .status(404)
      .json({ status: "failed", message: "Please type correct URL" });
  const record = await ShortUrl.findOneAndUpdate(
    {
      code: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!record)
    return res.status(404).json({ status: "failed", message: "URL not found" });
  res.redirect(record.redirectURL);
};

const getAnalytics = async (req, res) => {
  const result = await ShortUrl.find();
  console.log(result);
  if (!result)
    return res
      .status(404)
      .json({ status: "failed", message: "Data not found" });
  res.status(200).json({ status: "success", result });
};

module.exports = {
  generateNewShortUrl,
  getShortIdAndRedirect,
  getAnalytics,
  home,
};
