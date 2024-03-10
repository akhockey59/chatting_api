const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
//const multer = require("multer");
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn:"5d"});
};

/*const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("profileImage");*/





const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let user = await userModel.findOne({ email });
  
      if (user) {
        return res.status(400).json('The user with a similar email already exists in our server.');
      }
  
      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'Fill up all the required details. Your ID is not secure unless all details are provided.',
        });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address.' });
      }
  
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({
          message: 'Choose a stronger password. Your choices for a password are too weak.',
        });
      }
  
      user = new userModel({ name, email, password });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const token = createToken(user._id);
  
      res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  /*const registerUser = async (req, res) => {
    try {
        // Handle image upload if provided
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error uploading image' });
            }

            const { name, email, password } = req.body;

            // Check if an image was uploaded
            const profileImage = req.file
                ? {
                      data: req.file.buffer,
                      contentType: req.file.mimetype,
                  }
                : undefined;

            let user = await userModel.findOne({ email });

            if (user) {
                return res.status(400).json('The user with a similar email already exists in our server.');
            }

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Fill up all the required details. Your ID is not secure unless all details are provided.',
                });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: 'Please provide a valid email address.' });
            }

            if (!validator.isStrongPassword(password)) {
                return res.status(400).json({
                    message: 'Choose a stronger password. Your choices for a password are too weak.',
                });
            }

            user = new userModel({ name, email, password, profileImage });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const token = createToken(user._id);

            res.status(200).json({ _id: user._id, name, email, token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};*/

  
 const loginUser = async(req, res) => {
  const {email, password} = req.body;
  try {
    let user = await userModel.findOne({ email });

    if(!user) return res.status(400).json("Invalid email or password....");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) return res.status(400).json("invalid password.....");

    const token = createToken(user._id);
    res.status(200).json({_id: user._id, name: user.name, email, token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
 }
  
  


const findUser = async(req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const getUsers = async(req, res) => {

    try {
        const users = await userModel.find();
        res.status(200).json(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const deleteUser = async(req, res)=>{
  try {
      const userId = req.params.userId;
      const result = await userModel.deleteOne({_id:userId});
      if(result.deletedCount === 1){
        res.status(200).json({ success: true , message:"User deleted Successfully from the database"});
      }
      else if(result.deletedCount > 1){
        return res.status(400).json("deleting many users at once so reverted..");
      }
      else{
        res.status(404).json({ success: false, message: 'User not found' });
      }


  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
module.exports = {registerUser, loginUser, findUser, getUsers, deleteUser};