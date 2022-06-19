"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.updateTodos = exports.addTodos = exports.getTodos = void 0;
const app_1 = require("../../app");
const Todo_1 = require("../../entity/Todo");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoRepository = app_1.AppDataSource.getRepository(Todo_1.Todo);
        const allTodos = yield todoRepository.find();
        res.status(200).json(allTodos);
        console.log(allTodos);
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todoRepository = app_1.AppDataSource.getRepository(Todo_1.Todo);
        const todo = new Todo_1.Todo();
        todo.name = body.name;
        todo.description = body.description;
        todo.status = body.status;
        const newTodo = yield todoRepository.save(todo);
        const allTodos = yield todoRepository.find();
        res.status(201).json({
            message: "Todo added",
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodos = addTodos;
const updateTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const todoRepository = app_1.AppDataSource.getRepository(Todo_1.Todo);
        yield todoRepository.update(id, body);
        const updatedTodo = yield todoRepository.findOneBy({ id: Number(id) });
        const allTodos = yield todoRepository.find();
        res.status(200).json({
            message: "Todo updated",
            todo: updatedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodos = updateTodos;
const deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const todoRepository = app_1.AppDataSource.getRepository(Todo_1.Todo);
        const deletedTodo = yield todoRepository.findOneBy({ id: id });
        yield todoRepository.delete({ id: id });
        const allTodos = yield todoRepository.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodos = deleteTodos;
