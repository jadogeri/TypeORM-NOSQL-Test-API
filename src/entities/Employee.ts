import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity()
export class Employee {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    constructor(id :ObjectId, firstName : string, lastName : string, age: number){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}