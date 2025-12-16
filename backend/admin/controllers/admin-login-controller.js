export const adminLogin = async (req, res)=>{
    try {

        const {name, email, }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
        
    }
}