const express = require("express");
const multer = require('multer')
const router = express();
const mongoose = require("mongoose");
const Product = require("../models/product");
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let mime = file.mimetype.split('/')
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime[mime.length-1] )
  }
})

const imageFileFilter = (req, file, cb)=>{
  if(file.mimetype=="image/jpg" || file.mimetype=="image/png" || file.mimetype == "image/jpeg"){
     return cb(null, true)
  }else{
      return cb(new Error('Only image are allowed!'))
  }
};

var upload = multer({ storage: storage,fileFilter:imageFileFilter })

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json({
          data,
          length: data.length,
        });
      } else {
        res.status(401).json({
          Message: "no data found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", upload.single("image"), (req, res, next) => { 
  let img = 'uploads/'+req.file.filename
  let product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    image:img
  });

  product
    .save()
    .then((res) => {
      console.log({
        message: "Handling POST request to /products",
        createdProduct: res,
      });
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    message: "Handling POST request to /products",
    createdProduct: product,
  });
});

router.post("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({ data });
      } else {
        res.status(401).json({ Message: "id is unvalid" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const ob = {
    name: req.body.name,
    price: req.body.price,
  };
  Product.updateOne(
    { _id: id },
    {
      $set: ob,
    }
  )
    .exec()
    .then((data) => res.status(200).json({ data }));
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then((data) =>
      res.status(200).json({ Message: "Product Deleted", data: data })
    )
    .catch((err) =>
      res.status(500).json({ Message: "Error Deleted", error: err })
    );
});
module.exports = router;
