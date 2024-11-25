import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

async function registerUser(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = await userModel({
    name,
    email,
    password
  });
  const result = await newUser.save();
  return res.status(201).json({
    message: "کاربر ایجاد شد",
    user: result
  });
}

async function login(req, res) {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      
    if (!user) {
      return res.json({
        message: "رمزعبور یا ایمیل اشتباه است"
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.json({
        message: "رمزعبور یا ایمیل اشتباه است"
      });
    }

    const token = await jwt.sign({ email: user.email, id: user._id }, "secret");
    return res.json({
      message: "ورود با موفقیت انجام شد",
      user, // Contains only 'name' and 'email'
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "خطای سرور رخ داده است"
    });
  }
}

export default { registerUser, login };
