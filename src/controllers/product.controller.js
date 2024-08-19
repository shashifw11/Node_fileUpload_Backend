const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
const {uploadMultiple,uploadSingle} = require("../middleware/upload");

router.post("/single", uploadSingle("image_urls"), async (req, res) => {
  // multer is middleware which handle the file which i recive from the request
  // the image_urls is type of file like jpg,png,pdf etc than multer
  //take it and store it in local upload folder and give the unique
  // name and than after that path of that file is storing in database
  // as field name called image_urls
  try {
    // req.body => everthing comming in the form of json
    //body but when you send images you can not send it as
    //json, thses are send as something called as base64 incoded
    //or directly send them as file. as the file comes in the
    //form of formdata

    // so now what we are going to do is this whatever we will send
    //through postman will not come in the req.body, it will
    // come as formdata formate

    const product = await Product.create({
      // here we cannot use req.body because we need image url and
      //that image url not present in req.body because body only recive the
      //file and we can get image url from after the upload happened than
      // we were actually seeing this inside this upload and we need that
      //path were this upload happend.
      name: req.body.name,
      price: req.body.price,
      image_urls: req.file.path,
    });
    return res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/multiple", uploadMultiple("image_urls",3), async (req, res) => {
  try {
    const filePaths = req.files.map((file)=>file.path) // convert all filepath in array of filepath
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      image_urls: filePaths,
    });
    return res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
