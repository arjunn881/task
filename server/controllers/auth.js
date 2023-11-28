import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    const token = Jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.KEY,
      {
        expiresIn: "1h",
      }
    );

    

    res.status(200).json(newUser,token);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User already exists!!!" });
    }

    const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = Jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};


