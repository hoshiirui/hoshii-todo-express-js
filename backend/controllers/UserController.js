import pool from "../config/Database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

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
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confPassword = req.body.confPassword
    if(password !== confPassword) return res.status(400).json({msg: "Password didn't match!"})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    if(req.file == null){
        // return res.status(400).json({msg: "No file uploaded"})
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
    }else{
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const fileName = file.md5 + ext
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
        const allowedType = ['.png', '.jpg', '.jpeg']

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid image format"})
        if(fileSize > 5000000) return res.status(422).json({msg: "Invalid must be less than 5 MB"})

        // const {name, email, password, confPassword} = req.body;

        const query = `
        INSERT INTO users (name, email, password, image, url)
        VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [name, email, hashPassword, fileName, url];

        file.mv(`./public/images/${fileName}`, async(err) => {
            if(err) return res.status(500).json({msg: err.message})
            try {
                await pool.query(query, values);
                res.status(200).json({msg: "Register berhasil!"})
            } catch (error) {
                console.log(error.message)
            }
        })
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
        const url = user.url
        
        //pembuatan acc token
        const accessToken = jwt.sign({userId, name, email, url}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        //pembuatan refresh token
        const refreshToken = jwt.sign({userId, name, email, url}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
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