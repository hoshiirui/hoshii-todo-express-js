import Todo from "../models/TodoModel.js";

export const getTodos = async(req, res) => {
    try {
        const response = await Todo.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(err.message);
    }
}

export const getTodoById = async(req, res) => {
    try {
        const response = await Todo.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(err.message);
    }
}

export const createTodos = async(req, res) => {
    try {
        await Todo.create(req.body);
        res.status(201).json({msg: "Todo created!"});
    } catch (error) {
        console.log(err.message);
    }
}

export const updateTodos = async(req, res) => {
    try {
        await Todo.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Todo updated!"});
    } catch (error) {
        console.log(err.message);
    }
}

export const deleteTodos = async(req, res) => {
    try {
        await Todo.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Todo updated!"});
    } catch (error) {
        console.log(err.message);
    }
}