import { User } from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


//register
 const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//login
 const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({msg:"User does not exist"})
        }
        const isPasswordValid=await argon2.verify(user.password,password)
        if(!isPasswordValid){
            return res.status(400).json({msg:"Invalid password"})
        }
        const token=jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRETKEY)
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export {register,login}

