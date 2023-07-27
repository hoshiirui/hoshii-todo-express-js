// import Todo from "../models/TodoModel.js";
import pool from "../config/Database.js"

export const getTodos = (req, res) => {
    if(req.params.order){
        pool.query(`SELECT * FROM todo ORDER BY  ${req.params.order}`, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows)
        })
    }else{
        pool.query("SELECT * FROM todo", (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows)
        })
    }
}

export const getTodoById = (req, res) => {
    pool.query(`SELECT * FROM todo WHERE id=${req.params.id}`, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

export const createTodos = (req, res) => {
    const { title, description, status, deadline, userid } = req.body;
    const query = `
      INSERT INTO todo (title, description, status, deadline, userid)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [title, description, status, deadline, userid];

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(201).json({ msg: 'Todo created!' });
    })
}

export const updateTodos = (req, res) => {
    const { title, description, status, deadline, userid } = req.body;
    const query = `
        UPDATE todo
        SET title = $1,
            description = $2,
            status = $3,
            deadline = $4,
            userid = $5
        WHERE id = ${req.params.id};    
    `;
    const values = [title, description, status, deadline, userid];

    pool.query(query, values, (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: 'Todo updated!' });
    })
}

export const deleteTodos = (req, res) => {
    pool.query(`DELETE FROM todo WHERE id=${req.params.id}`, (error, results) => {
        if (error) throw error;
        res.status(200).json({ msg: `Todo with id ${req.params.id} has been deleted` });
    });    
}
