"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const typeorm_1 = require("typeorm");
const Todo_1 = require("./entity/Todo");
const app = (0, express_1.default)();
const port = 4000;
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test",
    entities: [Todo_1.Todo],
    synchronize: true,
    logging: false,
});
exports.AppDataSource = AppDataSource;
AppDataSource.initialize()
    .then(() => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(routes_1.default);
    app.listen(port, () => { console.log(`Server is running on port ${port}`); });
})
    .catch((error) => console.log(error));
