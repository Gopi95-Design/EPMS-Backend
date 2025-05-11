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
  router.route("/delete-employee/:id").delete(async (req, res, next) => {
    await RegisterSchema
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        console.log(result);
        res.json({
          data: result,
          msg: "Data successfully Deleted.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;