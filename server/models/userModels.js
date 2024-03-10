const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
       // _id:String,
       
        name:{
            type:String,
            required:true,
            minlenght:3,
            maxlength:100
        },
        email:{
            type:String,
            required:true,
            minlenght:3,
            maxlength:200,
            unique:true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        },
        password:{
            type:String,
            required:true,
            minlenght:3,
            maxlength:200,

        },
        /*profileImage: {
            data: {
                type: Buffer,
            },
            contentType: {
                type: String,
            }
        }*/
},{
    timestamps:true,
});


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;