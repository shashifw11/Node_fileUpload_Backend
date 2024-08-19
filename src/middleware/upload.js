const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../uploads")); // cb is calback function that takes two parametr first is error that is null and second is destination of where we want to store this images
  },

  filename: function (req, file, callback) {
    // it will give you the file name to adding some prefix to your original file name.
    const uniquePrefix = Date.now(); // + "-" + Math.round(Math.random() * 1e9
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "applicatio/pdf"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  // this upload basically calling this multer function which the package we import above.
  storage: storage, // this is storage function decleare avove
  fileFilter: fileFilter, // this filter help us to client only upload images
  limits: {
    fileSize: 1024 * 1024 * 5, // 1034 bytes = 1kB *1024 = 1MB *1024 =  1MB * 5 = 5MB
  },
});

const uploadSingle = (fieldName)=>{
  return (req, res, next) => {
    const uploadItems = upload.single(fieldName);
  
    uploadItems(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A multer error occurred when uploading.
        // console.log("err 28", err.message);
        return res
          .status(400)
          .send({ message: err.message, errorType: "MulterError" });
      } else if (err) {
        // An unknown error occured when uploading.
       // console.log("err 31 ", err.message);
        return res
          .status(400)
          .send({ message: err.message, errorType: "NormalError" });
      }
      next();
    });
  };
}


const uploadMultiple = (fieldName,fileCount) => {
  // middleware for multiple upload and error detaction
  return (req, res, next) => {
    //const uploadItems = upload.any("image_urls");
    const uploadItems = upload.array(fieldName,fileCount);
    uploadItems(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A multer error occurred when uploading.
        // console.log("err 55", err.message);
        return res
          .status(400)
          .send({ message: err.message, errorType: "MulterError" });
      } else if (err) {
        // An unknown error occured when uploading.
        //console.log("err 58", err.message);
        return res
          .status(400)
          .send({ message: err.message, errorType: "NormalError" });
      }
      next();
    });
  };
};

module.exports = { uploadSingle, uploadMultiple };
