import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next){
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).send("Unauthorized");
    }
    try{
        const payload = jwt.verify(token, "df677DE4CW");
        req.userId = payload.id;
        req.userType = payload.userType;
        next();
    }catch(err){
        return res.status(401).send("Unauthorized");
    }
}