const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Order = require("../models/order");

router.get("/", (req, res, next) => {
  Order.find()
    .then((data) => {
      res.status(200).json({
        message: "Handling GET request to /orders",
        orders: data,
        count: data.length,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "err",
      });
    });
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quantity: req.body.quantity,
  });
  order
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Handling POST request to /orders",
        order: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error",
      });
    });
});

router.post("/:orderId", (req, res, next) => {
  const id = req.params.orderId
  Order.findById(id).exec().then(
      data=>{
          res.status(200).json({
              Message: "Order Found",
              data:data
          })
      }
  ).catch(err=>{
      res.status(404).json({
          Message:"Order not Found",
          err:err
      })
  })
});

router.patch("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.updateOne(
      { _id: id },
      {
        $set: {
          product: req.body.product,
          quantity: req.body.quantity,
        },
      }
    )
      .exec()
      .then((data) => {
        res.status(200).json({
          Message: "Order Updated",
          data: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          Message: "Error Updated",
          err: err,
        });
      });
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json({
        Message: "Order Deleted",
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        Message: "Error Deleted",
        err: err,
      });
    });
});
module.exports = router;
