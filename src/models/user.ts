import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity({})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    timezone?: string;

    @Column({type: 'time with time zone'})
    birthdate?: Date;

    @CreateDateColumn({type: 'time with time zone'})
    createdAt: Date;

    @UpdateDateColumn({type: 'time with time zone'})
    updatedAt: Date;
}
