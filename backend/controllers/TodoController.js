// import Todo from "../models/TodoModel.js";
import pool from "../config/Database.js"

export const getTodos = (req, res) => {
    pool.query("SELECT * FROM todo", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

// export const getTodos = async(req, res) => {
//     try {

//         let orderCriteria;
//         if (req.params.order) {
//             // If req.params.order is available, use it for ordering
//             orderCriteria = [req.params.order];
//         } else {
//             // If req.params.order is not available or null, default to ordering by 'id'
//             orderCriteria = ["id"];
//         }
//         const response = await Todo.findAll({
//             order: [orderCriteria]
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const getTodoById = async(req, res) => {
//     try {
//         const response = await Todo.findOne({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(err.message);
//     }
// }

// export const createTodos = async(req, res) => {
//     try {
//         await Todo.create(req.body);
//         res.status(201).json({msg: "Todo created!"});
//     } catch (error) {
//         console.log(err.message);
//     }
// }

// export const updateTodos = async(req, res) => {
//     try {
//         await Todo.update(req.body, {
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Todo updated!"});
//     } catch (error) {
//         console.log(err.message);
//     }
// }

// export const deleteTodos = async(req, res) => {
//     try {
//         await Todo.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Todo updated!"});
//     } catch (error) {
//         console.log(err.message);
//     }
// }