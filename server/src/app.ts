import "reflect-metadata"
import express, {Express} from "express"
import cors from "cors"
import todoRoutes from "./routes"
import { DataSource } from "typeorm"
import {Todo} from "./entity/Todo"

const app: Express = express()
const port: number = 4000


const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [Todo],
    synchronize: true,
    logging: false,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(todoRoutes)

AppDataSource.initialize()
    .then(()=>{
        app.listen(port, ()=>{console.log(`Server is running on port ${port}`)})
    })
    .catch((error)=>console.log(error))

export { AppDataSource }