import {Response, Request} from "express"
import { InsertOrUpdateOptions } from "typeorm/query-builder/InsertOrUpdateOptions"
import {AppDataSource} from "../../app"
import { Todo } from "../../entity/Todo"
import {ITodo} from "../../types/todo"

const getTodos = async (req: Request, res: Response) => {
    try {
        const todoRepository = AppDataSource.getRepository(Todo)
        const allTodos = await todoRepository.find()
        res.status(200).json(allTodos)
        
    } catch (error) {
        throw error
    }
    
}

const addTodos = async (req: Request, res: Response):Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
        const todoRepository = AppDataSource.getRepository(Todo)
        const todo: ITodo = new Todo()

        todo.name = body.name
        todo.description = body.description
        todo.status = body.status

        const newTodo = await todoRepository.save(todo)
        const allTodos = await todoRepository.find()

        res.status(201).json({
            message: "Todo added",
            todo: newTodo,
            todos: allTodos,
        })
        
    } catch (error) {
        throw error
    }
}

const updateTodos = async (req: Request, res: Response):Promise<void> => {
    try {
        const {
            params: {id},
            body
        } = req
        const todoRepository = AppDataSource.getRepository(Todo)
        await todoRepository.update(id, body)
        const updatedTodo = await todoRepository.findOneBy({id: Number(id)})
        const allTodos = await todoRepository.find()

        res.status(200).json({
            message: "Todo updated",
            todo: updatedTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodos = async (req: Request, res: Response):Promise<void> => {
    try {
        const id = Number(req.params.id)
        const todoRepository = AppDataSource.getRepository(Todo)
        const deletedTodo = await todoRepository.findOneBy({id: id})
        await todoRepository.delete({id: id})
        const allTodos = await todoRepository.find()

        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        console.log(error);
        
    }
}


export {getTodos, addTodos, updateTodos, deleteTodos}