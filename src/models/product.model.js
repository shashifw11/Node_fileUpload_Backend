const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    price : {type : String , required:true},
    image_urls : [{type:String , required : true}], // we are not storing file in database than ho do we know user has this profile pitcure , so what we do it where we will store it we will get some kind of url and that url we will store it in databse. 
},{
    versionKey : false,
    timestamps : true
})

const Product = mongoose.model("product",productSchema)

module.exports = Product