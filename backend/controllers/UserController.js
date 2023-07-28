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

// export const getTodos = (req, res) => {
//     if(req.params.filter === '3'){
//       pool.query(`SELECT * FROM todo ORDER BY ${req.params.order}`, (error, results) => {
//         if (error) throw error
//         res.status(200).json(results.rows)
//       })
//     }else{
//       pool.query(`SELECT * FROM todo WHERE status=${req.params.filter} ORDER BY ${req.params.order}`, (error, results) => {
//         if (error) throw error
//         res.status(200).json(results.rows)
//       })
//     }
//   }