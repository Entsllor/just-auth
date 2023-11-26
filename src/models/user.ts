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

    @Column({nullable: true})
    firstName?: string

    @Column({nullable: true})
    lastName?: string

    @Column({nullable: true})
    timezone?: string;

    @Column({type: 'timestamptz', nullable: true})
    birthdate?: Date;

    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}
