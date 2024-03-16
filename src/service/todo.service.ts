import { HttpException } from '../exceptions/httpException'
import { todoBody } from '../interface/todo.interface';
import Todo from "../models/todo.model"

export async function createToDo(text:string){
try {
    if(text.length === 0){
        throw new HttpException(400,'please add something on text field')
    }
    const todoData:Todo = await Todo.create({text})
    return todoData;

} catch (error) {
    throw error
}
}