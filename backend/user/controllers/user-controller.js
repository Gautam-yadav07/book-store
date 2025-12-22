import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import bcrypt from "bcrypt"



export const createUser = async (req, res) => {
    try {
        const { name, email, password, address, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled"
            });
        }

        const existing = await User.findOne({
            $or: [{ email }, { mobile }]
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: req.body.role || 'user', // default user
            address,
            mobile
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const userLogin = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All the feilds are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found with this email please sign up"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const token = jwt.sign({id:user._id, role: user.role ||"User", email:user.email}, process.env.JWT_SECRET,{expiresIn:"1d"})

        res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});


        return res.status(200).json({
            success:true,
            message:"user login succesfully",
            token
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}

export const updateUser = async(req, res)=>{
    try {
        const {id} = req.params
        const updates = req.body
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }
        
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update",
            });
        }

        // User cannot change role
        if (updates.role) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to change role",
            });
        }
        
        if (updates.password) {
            return res.status(403).json({
                success: false,
                message: "Password cannot be updated from this endpoint",
            });
        }
        if(updates.password){
            return res.status(400).json({
                success:false,
                message:"You can not change password"
            })
        }


        Object.keys(updates).forEach((key)=>{
            if(updates[key] !== undefined && updates[key] !== ""){
                user[key] = updates[key]
            }
        })
        await user.save()
        return res.status(200).json({
            success:true,
            message:"User updated succesfully",
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


export const getById = async(req, res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"No user found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"User details fetched succesfully",
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}