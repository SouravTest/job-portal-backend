//midddleware/authMidddleware.js
import JWT from 'jsonwebtoken'

const userAuth = async (req,res,next) =>{

        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return next('Token is required or invalid format');
        }
        const token = authHeader.split(' ')[1];
    try{
        const payload = JWT.verify(token , process.env.JWT_SECRET);
        req.user = {userId : payload.userId}
        //console.log('Authenticated User:', req.user);
        next();
    }catch(err){
        next('Auth failed-Unauthorised');
    }
}  

export default userAuth;