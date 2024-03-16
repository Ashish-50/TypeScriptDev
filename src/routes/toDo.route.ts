import { Router } from "express";
import { createTodo, getTodos } from "../controller/toDoController";
import { AuthMiddleware } from "../middleware/auth.middleware";

const toDorouter = Router();

toDorouter.post("/createTodo", AuthMiddleware, createTodo);
toDorouter.get("/", getTodos);

export default toDorouter;