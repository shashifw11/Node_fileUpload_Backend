const express = require("express");
const app = express();
const productController = require("./controllers/product.controller")
// for the frontend it will send us a file and we need to save this file to somewhere also we need to make sure that our database has the file some how.
// so when ever you can upload any file or picture from frontend and than backend can capable to handle this file and make it avilable for client and any time.
 // we can store that file in aws s3 etc

app.use(express.json()); // for reading the json body we have this expre.json , but for formdata we will install package multer , this multer package also help us to uploading the file

app.use("/products",productController)


module.exports = app;



