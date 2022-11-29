const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    
    try{
        const token=req.headers.authorization.split(" ")[1];
    
        if(!token){
            return res.status(401).json({
                message: "Token not Found! Unathorized!!",
            }); 
        }
        const decodedToken=jwt.verify(token,"mysecret");
        req.rollno=decodedToken.rollno;
        next();
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error!",
        });
    }
}