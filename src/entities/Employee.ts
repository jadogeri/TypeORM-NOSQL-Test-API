import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { ObjectId } from "mongodb"; // Import ObjectID from the 'mongodb' package


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

    @CreateDateColumn()
    createdAt!: Date; // This column will automatically store the creation date

    @UpdateDateColumn()
    updatedAt!: Date; // This column will automatically store the last update date

    constructor(id :ObjectId, firstName : string, lastName : string, age: number){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
