let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let RegisterSchema = require("../Model/Register");


router.route("/get-employee/:id").get(async (req, res, next) => {
  await RegisterSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});


  router.route("/main/:id").put(async (req, res, next) => {
    await RegisterSchema
      .findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      .then((result) => {
        console.log(result);
        res.json({
          data: result,
          msg: "Data successfully updated.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;