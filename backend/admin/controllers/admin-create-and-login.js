import { User } from "../../user/models/user-model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createSuperAdmin = async (req, res) => {
    try {
        const existing = await User.findOne({ role: "Admin" });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const superAdmin = await User.create({
            ...req.body,
            password:hashedPassword,
            role: "Admin"
        });

        return res.status(201).json({
            success: true,
            message: "Super Admin created successfully",
            data: superAdmin
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const AdminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:" All the feilds are required"
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found with these email"
            })
        
        }
        // const isMatch = await bcrypt.compare(password, user.password)


        const isMatch = await bcrypt.compare(password, user.password);


        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({id:user._id, role:user.role, email:user.email}, process.env.JWT_SECRET, {expiresIn:"1d"})

        res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});
         return res.status(200).json({
            success:true,
            message:"Admin login succesfully",
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


export const deleteAdmin = async(req, res)=>{
    try {
        const user = await User.findOneAndDelete({role:"Admin"})
        return res.status(200).json({
            success:true,
            message:"Admin deleted succ3esfull",
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
