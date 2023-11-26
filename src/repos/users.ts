import {User} from "../models/user";
import {SignupDto} from "../schemas/users";
import bcrypt from 'bcrypt'
import {IUsersRepo} from "../types/repos/users";
import {omit} from "radash";
import {getDb} from "../helpers/get-db";

class UsersDbRepo implements IUsersRepo {
    get dataSource() {
        return getDb().getRepository(User)
    }

    async getDuplicate(email: string, username: string): Promise<User | null> {
        return await this.dataSource.findOne({where: [{email: email}, {username: username}]})
    }

    async create(userData: SignupDto) {
        const user = this.dataSource.create({
            password: await bcrypt.hash(userData.password, 12),
            ...omit(userData, ['password']),
            birthdate: userData.birthdate ? new Date(userData.birthdate) : undefined,
        })
        return this.dataSource.save(user)
    }

    getById(id: string): Promise<User | null> {
        return this.dataSource.findOne({where: {id}});
    }

    search(): Promise<User[]> {
        return this.dataSource.find();
    }
}

export const Users = new UsersDbRepo();