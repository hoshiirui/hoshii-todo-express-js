import jwt from "jsonwebtoken"
import pool from "../config/Database.js"

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        //lempar login
        if(!refreshToken) return res.sendStatus(401);
        // ini gunanya ada token ditaruh di db, bisa diilangin sih ini
        // const user = await Users.findAll({
        //     where: {
        //         refresh_token: refreshToken
        //     }
        // })

        const result = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])
        const user = result.rows
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id
            const name = user[0].name
            const email = user[0].email
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '25s'
            })
            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}