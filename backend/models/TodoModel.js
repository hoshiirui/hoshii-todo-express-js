import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const {DataTypes} = Sequelize;
const Todo = db.define('todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    userid: DataTypes.INTEGER
}, {
    freezeTableName:true
})

export default Todo;

(async()=>{
    await db.sync();
})();