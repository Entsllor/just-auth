import {User} from "../../models/user";
import {SignupDto} from "../../schemas/users";

export interface IUsersRepo {
    create(user: SignupDto): Promise<User>;

    getDuplicate(email: string, username: string): Promise<User | undefined>

    getById(id: string): Promise<User | undefined>
}