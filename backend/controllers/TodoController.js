import pool from "../config/Database.js"

export const getTodos = (req, res) => {
  if(req.params.filter === '3'){
    try {
      pool.query(`SELECT * FROM todo WHERE userid=${req.params.user} ORDER BY ${req.params.order}`, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
    } catch (error) {
      console.log(error.message)
    }
  }else{
    try {
      pool.query(`SELECT * FROM todo WHERE status=${req.params.filter} AND userid=${req.params.user} ORDER BY ${req.params.order}`, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const getTodoById = async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM todo WHERE id=${req.params.id}`);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error occurred while fetching the todo item:", error.message);
      res.status(500).json({ error: "An error occurred while fetching the todo item." });
    }
};

export const createTodos = async (req, res) => {
    const { title, description, status, deadline, userid } = req.body;
    const query = `
      INSERT INTO todo (title, description, status, deadline, userid)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [title, description, status, deadline, userid];
  
    try {
      await pool.query(query, values);
      res.status(201).json({ msg: 'Todo created!' });
    } catch (error) {
      console.error("Error occurred while creating the todo item:", error.message);
      res.status(500).json({ error: "An error occurred while creating the todo item." });
    }
};
  

export const updateTodos = async (req, res) => {
    const { title, description, status, deadline, userid } = req.body;
    const query = `
      UPDATE todo
      SET title = $1,
          description = $2,
          status = $3,
          deadline = $4,
          userid = $5
      WHERE id = $6;    
    `;
    const values = [title, description, status, deadline, userid, req.params.id];
  
    try {
      await pool.query(query, values);
      res.status(200).json({ msg: 'Todo updated!' });
    } catch (error) {
      console.error("Error occurred while updating the todo item:", error.message);
      res.status(500).json({ error: "An error occurred while updating the todo item." });
    }
};
  

export const deleteTodos = async (req, res) => {
    try {
      await pool.query(`DELETE FROM todo WHERE id=${req.params.id}`);
      res.status(200).json({ msg: `Todo with id ${req.params.id} successfully deleted!` });
    } catch (error) {
      console.error("Error occurred while deleting the todo item:", error);
      res.status(500).json({ error: "An error occurred while deleting the todo item." });
    }
};