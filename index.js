const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan")
const dotenv = require("dotenv");

const User = require("./userModel");
const jwt = require("jsonwebtoken");


const generateToken = async (name) => {
  return await jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: process.env.TIME,
  });
};


dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(`DB Error: ${err.message}`));

  
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


app.post("/signup",async(req,res)=>{
    try {
        const { name, email } = req.body;
        if (!name || !email ) {
          res.status(400).send({
            success: false,
            message: "Please Enter all the fields",
          });
        } else {
          const existUser = await User.findOne({ email: email });
          if (existUser) {
            res.status(400).send({
              success: false,
              message: "User Already exists",
            });
          } else {
            const user = new User({
              name: name,
              email: email
            });
            await user.save();
            res.status(200).send({
              success: true,
              message: "Registration successfully",
              user,
            });
          }
        }
      } catch (error) {
        res.status(404).send({
          success: false,
          message: error,
        });
      }
})


app.post("/login",async(req,res)=>{
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).send({
        success: false,
        message: "Please Enter all the fields",
      });
    } else {
      const user = await User.findOne({ email: email });
      if (user ) {
        const authToken = await generateToken(user.name);
        res.status(201).send({
          success: true,
          message: "Login Successfully",
          token: authToken,
          user,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "User not found with this name",
        });
      }
    }
})




const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`App is running on port ${port}.....`);
});
