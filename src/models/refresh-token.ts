import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import type {User} from "./user";
import {UUID} from "backend-batteries";

@Entity({})
export class RefreshToken {
    @PrimaryColumn({length: 63})
    body: string;

    @ManyToOne("User", (user: User) => user.refreshTokens)
    user: User;

    @Column()
    userId: UUID;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @Column({type: "timestamptz"})
    expireAt: Date;

    @Column({length: 31})
    authorIp: string;

    @Column({length: 255})
    userAgent: string;


    @Column({type: 'timestamptz', nullable: true})
    revokedAt?: Date;
}
