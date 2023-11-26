import {SignupDto} from "../schemas/users";
import {Users} from "../repos/users";
import {raise} from "backend-batteries";
import {NotUniqueEmail, NotUniqueUsername} from "../exceptions";
import {User} from "../models/user";

export async function signupUser(signupData: SignupDto): Promise<User> {
    const duplicate = await Users.getDuplicate(signupData.email, signupData.username)
    if (duplicate) {
        duplicate.email === signupData.email && raise(NotUniqueEmail)
        duplicate.username === signupData.username && raise(NotUniqueUsername)
    }
    return await Users.create(signupData);
}


export async function readUser(userId: string): Promise<User | null> {
    return await Users.getById(userId);
}

export async function searchUsers(): Promise<User[]> {
    return await Users.search();
}
