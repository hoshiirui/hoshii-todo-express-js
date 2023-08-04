import jwt from "jsonwebtoken"
import pool from "../config/Database.js"

export const refreshToken = async(req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const refreshToken = authHeader && authHeader.split(' ')[1]
        //lempar login
        if(!refreshToken){
            console.log("Token not found!") 
            return res.sendStatus(401);
        }

        // const result = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])
        // const user = result.rows
        // if(!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = decoded.id
            const name = decoded.name
            const email = decoded.email
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '300s'
            })
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}