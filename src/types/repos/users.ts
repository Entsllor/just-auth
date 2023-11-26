import {User} from "../../models/user";
import {SignupDto} from "../../schemas/users";

export interface IUsersRepo {
    create(user: SignupDto): Promise<User>;

    getDuplicate(email: string, username: string): Promise<User | null>

    getById(id: string): Promise<User | null>

    search(): Promise<User[]>
}