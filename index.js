let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

// Express Route
const AdminModel=require("./Model/Admin")
const RegisterRoute=require("./routes/register.routes")
const UpdateRoute=require("./routes/update.routes")
const DeleteRoute=require("./routes/delete.routes")


// Connecting mongoDB Database
mongoose
  .connect("mongodb://127.0.0.1:27017/Database")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
  

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());



app.post('/adminlogin', (req, res) => {
const password=req.body.password
 AdminModel.findOne({ email: req.body.email })
    .then(user => {
      if (user.password == password) {
        res.json("success");
      }
      else (user.password == password)
      {
        res.json("incorrect password");
      }
    })
    .catch(err=>console.log(err))

})

  app.use("/Register",RegisterRoute,UpdateRoute,DeleteRoute)

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
