import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 50,
    })
    name!: string

    @Column("text")
    description!: string
    
    @Column()
    status!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}