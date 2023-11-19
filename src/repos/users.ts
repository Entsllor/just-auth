import {User} from "../models/user";
import {SignupDto} from "../schemas/users";
import {uuid4, valuesOf} from "backend-batteries";
import bcrypt from 'bcrypt'
import {IUsersRepo} from "../types/repos/users";
import {omit} from "radash";

class UsersDbRepo implements IUsersRepo {
    _users: Record<string, User> = {}

    async getDuplicate(email: string, username: string): Promise<User | undefined> {
        return valuesOf(this._users).find(user => user.email === email || user.username === username)
    }

    async create(userData: SignupDto) {
        const user: User = {
            id: uuid4(),
            password: await bcrypt.hash(userData.password, 12),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...omit(userData, ['password']),
            birthdate: userData.birthdate ? new Date(userData.birthdate) : undefined,
        };
        this._users[user.id] = user
        return user
    }

    getById(id: string): Promise<User | undefined> {
        return Promise.resolve(this._users[id]);
    }
}

export const Users = new UsersDbRepo();