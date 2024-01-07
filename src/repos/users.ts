import {User} from "../models/user";
import {SignupDto} from "../schemas/users";
import {IUsersRepo} from "../types/repos/users";
import {IBaseDbRepo} from "./base";
import {hashPassword} from "../helpers/passwords";

class UsersDbRepo extends IBaseDbRepo<User> implements IUsersRepo {
    model = User;

    async getDuplicate(email: string, username: string): Promise<User | null> {
        return await this.repo.findOne({where: [{email: email}, {username: username}]});
    }

    async create(userData: SignupDto) {
        const user = this.repo.create({
            ...userData,
            password: await hashPassword(userData.password),
            birthdate: userData.birthdate ? new Date(userData.birthdate) : undefined,
        });
        return this.repo.save(user);
    }

    getById(id: string): Promise<User | null> {
        return this.repo.findOne({where: {id}});
    }

    search(): Promise<User[]> {
        return this.repo.find();
    }

    getByIdentity(identity: {username: string} | {id: string} | {email: string}): Promise<User | null> {
        return this.repo.findOne({where: identity});
    }
}

export const Users = new UsersDbRepo();
