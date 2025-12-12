
export const isUser = (req, res, next)=>{
    if (req.user?.role !== "User"){
        return res.status(404).json({
            success:false,
            message:"Forbidden only user is allowed"
        })
    }
    next()
}