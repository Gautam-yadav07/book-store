
export const isAdmin = (req, res, next)=>{
    if (req.user?.role !== "Admin"){
        return res.status(404).json({
            success:false,
            message:"Forbidden only Admin is allowed"
        })
    }
    next();
}