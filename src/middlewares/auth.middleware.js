 export const authMiddleware=async(req,res,next)=>{
    const Token=req.cookies.refreshToken;
    if(!Token){
       throw new ApiError("No refresh token found",400);
    }
    const verify=await jwt.verify(Token,process.env.JWT_REFRESH_SECRET);
    if(!verify){
        throw new ApiError("Invalid refresh token",400);
    }
    req.userId=verify._id;
    next();
}