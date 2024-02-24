const ShortUrl = require("./../model/url");
const shortid = require("shortid");

const home = async (req, res) => {
  const result = await ShortUrl.find();
  res.status(200).json({
    status: "success",
    data: { results: result.length, result },
  });
};

const postAlias = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: "failed",
      message: "Alias not found",
    });
  }
  const alias = req.body.alias;
  const result = await ShortUrl.create({
    alias: alias,
    shortId: process.env.baseAlias + alias,
  });
  res.status(200).json({
    status: "success",
    data: {
      alias: result.alias,
      aliasedLink: result.shortId,
    },
  });
};

const getAlias = async (req, res) => {
  const result = await ShortUrl.find();
  res.status(200).json({
    status: "success",
    result,
  });
};

const generateNewShortUrl = async (req, res) => {
  const shortId = shortid();
  const urlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9_\-]+)*(\/?(\?[a-zA-Z0-9_]+=[a-zA-Z0-9_%]+&?)?)?$/;
  const link = process.env.baseURL + "/" + shortId;
  console.log(link);
  const body = req.body;
  if (!body.url)
    return res
      .status(400)
      .json({ status: "failed", message: "url is requrired" });

  const URL = req.body.url;

  if (urlRegex.test(URL)) {
    const result = await ShortUrl.findOne({
      redirectURL: req.body.url,
    });
    if (result)
      return res.status(201).json({
        data: {
          shortURL: result.shortLink,
          originalURL: result.redirectURL,
        },
      });
  } else {
    return res.status(400).json({
      status: "failed",
      data: {
        shortURL: "",
        originalURL: "",
      },
    });
  }

  if (urlRegex.test(URL)) {
    const url = await ShortUrl.create({
      code: shortId,
      shortLink: link,
      visitHistory: [],
    });
    return res.status(201).json({
      status: "success",
      data: { shortURL: url.shortId, originalURL: url.redirectURL },
    });
  } else {
    return res.status(400).json({
      status: "failed",
      data: {
        shortURL: "",
        originalURL: "",
      },
    });
  }
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
  // res.json({ record });
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.shortid;
  const result = await ShortUrl.findOne({ code: shortId });
  if (!result)
    return res.status(404).json({ status: "failed", message: "URL not found" });
  return res.status(200).json({
    status: "success",
    data: {
      totalClicks: result.visitHistory.length,
      createdAt: result.createdAt,
    },
  });
};

// const pushUrl = async (req, res) => {
//   const shortId = shortid();
//   const result = await ShortUrl.findOneAndUpdate(
//     { alias: req.body.alias },
//     {
//       $push: {
//         urls: {
//           url: req.body.url,
//         },
//         shortLink: {
//           link: process.env.baseURL + "/" + shortId,
//         },
//       },
//     }
//   );
//   res.status(200).json({ status: "success", data: { result } });
// };

module.exports = {
  getShortIdAndRedirect,
  generateNewShortUrl,
  getAnalytics,
  postAlias,
  getAlias,
  // pushUrl,
  home,
};
