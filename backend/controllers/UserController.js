import pool from "../config/Database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async(req, res) => {
    try {
        pool.query(`SELECT * FROM users`, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.log(error)
    }
}

export const Register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password didn't match!"})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `;
    const values = [name, email, hashPassword];
    try {
        await pool.query(query, values);
        res.status(200).json({msg: "Register berhasil!"})
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [req.body.email]
        );
        
        const user = result.rows[0]
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({msg: "Wrong password!"})
        const userId = user.id
        const name = user.name
        const email = user.email
        
        //pembuatan acc token
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '120s'
        })
        //pembuatan refresh token
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        // const queryupdate = `UPDATE users SET refresh_token = $1 WHERE id = $2;`;
        // const values = [refreshToken, userId];
        // await pool.query(queryupdate, values);
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000
        //     // secure: true
        // })
        res.json({ accessToken, refreshToken })
    } catch (error) {
        res.status(404).json({msg:"Email not found!"})
        console.log(error)
    }
}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        //lempar login
        if(!refreshToken) return res.sendStatus(204);
        // ini gunanya ada token ditaruh di db, bisa diilangin sih ini
        const result = await pool.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])
        const user = result.rows[0]
        if(!user) return res.sendStatus(204);
        const userId = user.id
        // await Users.update({refresh_token: null}, {
        //     where: {
        //         id: userId
        //     }
        // })
        const query = `UPDATE users SET refresh_token = null WHERE id = $1;`;
        await pool.query(query, [userId]);
        res.clearCookie('refreshToken')
        return res.sendStatus(200);
}