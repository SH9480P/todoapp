import { Router } from "express"
import {addTodos, deleteTodos, getTodos, updateTodos} from "../controllers/todos"

const router: Router = Router()

router.get("/todos", getTodos)
router.post("/add-todo", addTodos)
router.put("/edit-todo/:id", updateTodos)
router.delete("/delete-todo/:id", deleteTodos)

export default router