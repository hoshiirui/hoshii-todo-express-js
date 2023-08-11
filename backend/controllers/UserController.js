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

export const getUserById = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`);
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error occurred while fetching the user information:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the user information." });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`);
        if(result.rowCount == 0) return res.status(404).json({msg: "User not found!"})
        try {
            if(result.rows[0].image){
                const filepath = `./public/images/${result.rows[0].image}`
                // console.log(result.rows[0].image)
                fs.unlinkSync(filepath);
            }
            await pool.query(`DELETE FROM users WHERE id=${req.params.id}`);
            res.status(200).json({msg: "User deleted succesfully"})
        } catch (error) {
            console.log(error.message)
        }
    } catch (error) {
        console.error("Error occurred while fetching the user information:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the user information." });
    }
}

export const updateUser = async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    try {
        console.log(req.files.file)
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        const fileName = file.md5 + Date.now() + ext
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
        const allowedType = ['.png', '.jpg', '.jpeg']

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid image format"})
        if(fileSize > 5000000) return res.status(422).json({msg: "Invalid must be less than 5 MB"})

        // const {name, email, password, confPassword} = req.body;

        const query = `
        UPDATE users SET name = $1, email = $2, image = $3, url = $4 WHERE id = $5;
        `;
        const values = [name, email, fileName, url, req.params.id];

        const filepath = `./public/images/${req.body.prev}`
        // console.log(result.rows[0].image)
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, async(err) => {
            if(err) return res.status(500).json({msg: err.message})
            try {
                await pool.query(query, values);
                // console.log(values)
                // console.log("register berhasil isi file")
                res.status(200).json({msg: "Update berhasil!"})
            } catch (error) {
                console.log(error.message)
            }
        })
    } catch (error) {
        const query = `
        UPDATE users SET name = $1, email = $2 WHERE id = $3;
        `;
        const values = [name, email, req.params.id];
        try {
            await pool.query(query, values);
            // console.log("Register berhasil ga isi file")
            res.status(200).json({msg: "Update berhasil!"})
        } catch (error) {
            console.log(error)
        }
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
    // console.log(req.body)
    // console.log(req.files.file)
    // console.log(req.headers)

    try {
        console.log(req.files.file)
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
                // console.log(values)
                // console.log("register berhasil isi file")
                res.status(200).json({msg: "Register berhasil!"})
            } catch (error) {
                console.log(error.message)
            }
        })
    } catch (error) {
        const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        `;
        const values = [name, email, hashPassword];
        try {
            await pool.query(query, values);
            // console.log("Register berhasil ga isi file")
            res.status(200).json({msg: "Register berhasil!"})
        } catch (error) {
            console.log(error)
        }
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