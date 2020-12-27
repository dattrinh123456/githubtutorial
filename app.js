const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dattrinh:Ow2y9AMybm80fNQo@cluster0.pwo9o.mongodb.net/Ecommnerce?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const productsRoute = require("./api/routes/products");
const ordersRoute = require("./api/routes/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Tpye,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

app.use((req, res, next) => {
  const err = new Error("not Found");
  next(err);
});

module.exports = app;
