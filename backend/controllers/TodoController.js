import Todo from "../models/TodoModel.js";

export const getTodos = async(req, res) => {
    try {
        const response = await Todo.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(err.message);
    }
}