import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee } from "./entities/Employee";// Assuming you have a User entity

export const AppDataSource = new DataSource({
    type: "mongodb",
    port:27017,
    host:"localhost",
    database: "testdb", // Name of your SQLite database file
    entities:{Employee}
});