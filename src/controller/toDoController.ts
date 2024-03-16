//this is another type that is exported by express to handle request parameters
import { NextFunction, Request,Response } from "express";
import { todoBody } from "../interface/todo.interface";
import * as toDoService from '../service/todo.service'


export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const text = (req.body as { text: string }).text;
        const userId:string = req.user;
        const newTodo = await toDoService.createToDo(text); 

        res.status(201).json({
            message: "Todo created",
            todo: newTodo
        });
    } catch (error) {
        next(error);
    }
};

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const todos = await toDoService.getTodos(); // Retrieve todos using Todo service

        // res.status(200).json({ todos });
    } catch (error) {
        next(error);
    }
};
