import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 200})
    name: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

}