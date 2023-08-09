import express from "express";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js"
import UserRoute from "./routes/UserRoute.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(fileUpload())
app.use(express.static("public"))
app.use(cookieParser())
app.use(TodoRoute);
app.use(UserRoute)

app.listen(5000, () => console.log('Server running...'));

