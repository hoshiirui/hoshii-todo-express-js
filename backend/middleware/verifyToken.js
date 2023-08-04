import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    try {
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(data){
            next()
        }else{
            res.sendStatus(403)
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(403)
    }
}
