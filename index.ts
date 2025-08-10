
import { AppDataSource } from "./src/data-source";
import { Employee } from "./src/entities/Employee";
import express, { Response, Request } from "express";
import { ObjectId } from 'mongodb'

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        app.use(express.json());

        const employeeRepository = AppDataSource.getMongoRepository(Employee);

        // CREATE
        app.post("/employees", async (req : Request, res: Response) => {
            const employee = employeeRepository.create(req.body);
            await employeeRepository.save(employee);
            res.status(201).json(employee);
        });

        // READ (All)
        app.get("/employees", async (req, res) => {
            const employees = await employeeRepository.find();
            res.json(employees);
        });

        // READ (One)
        app.get("/employees/:id", async (req, res) => {
            const stringID = req.params.id;
            console.log("stringid", stringID)
            const objectID = new ObjectId(stringID)
            console.log("objectid", objectID)
            const employees = await employeeRepository.find();
            let employee : Employee | null = null;
            for(let index : number = 0; index < employees.length; index++){
                console.log("employee in array id ==", employees[index].id)
                if(objectID.toString() == employees[index].id.toString()){
                    employee = employees[index];
                    break;
                }
            }
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // UPDATE
        app.put("/employees/:id", async (req, res) => {
            const stringID = req.params.id;
            console.log("stringid", stringID)
            const objectID = new ObjectId(stringID)
            console.log("objectid", objectID)
            const employees = await employeeRepository.find();
            let employee : Employee | null = null;
            for(let index : number = 0; index < employees.length; index++){
                console.log("employee in array id ==", employees[index].id)
                if(objectID.toString() == employees[index].id.toString()){
                    employee = employees[index];
                    break;
                }
            }
            if (employee) {
                employeeRepository.merge(employee, req.body);
                await employeeRepository.save(employee);
                res.json(employee);
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // DELETE (One)
        app.delete("/employees/:id", async (req, res) => {
            const stringID = req.params.id;
            const objectID = new ObjectId(stringID);
            const result = await employeeRepository.delete(objectID);
            if (result.affected as number > 0

            ) {
                res.status(204).send(); // No Content
            } else {
                res.status(404).send("Employee not found");
            }
        });

        // DELETE (All)
        app.delete("/employees", async (req, res) => {
            const result = await employeeRepository.deleteMany({});
            if (result.deletedCount as number > 0

            ) {
                res.status(204).send(); // No Content
            } else {
                res.status(404).send("Employee not found");
            }
        });

        app.listen(4000, () => {
            console.log("Server running on port 4000");
        });
    })
    .catch((error) => console.log(error));

    