
export const isSubAdmin = (req, res, next)=>{
    if (req.user?.role !== "SubAdmin"){
        return res.status(404).json({
            success:false,
            message:"Forbidden only Sub Admin is allowed"
        })
    }
    next();
}