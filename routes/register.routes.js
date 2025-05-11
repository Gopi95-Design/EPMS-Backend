let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let RegisterSchema = require("../Model/Register");

// CREATE Student
router.route("/apply").post(async (req, res, next) => {
  await RegisterSchema
    .create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// READ Students
router.route("/list").get(async (req, res, next) => {
  await RegisterSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});



module.exports = router;
