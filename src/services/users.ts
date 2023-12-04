import {LoginDto, SignupDto} from "../schemas/users";
import {Users} from "../repos/users";
import {raise} from "backend-batteries";
import {NotUniqueEmail, NotUniqueUsername, UserNotFound} from "../exceptions";
import {User} from "../models/user";
import {createTokens} from "./tokens";
import {RefreshToken} from "../models/refresh-token";

export async function signupUser(signupData: SignupDto): Promise<User> {
    const duplicate = await Users.getDuplicate(signupData.email, signupData.username)
    if (duplicate) {
        duplicate.email === signupData.email && raise(NotUniqueEmail)
        duplicate.username === signupData.username && raise(NotUniqueUsername)
    }
    return await Users.create(signupData);
}

export async function login(loginDto: LoginDto, userInfo: {
    ip: string,
    userAgent?: string
}): Promise<[RefreshToken, string]> {
    const user = await Users.getByIdentity({email: loginDto.email}) || raise(UserNotFound)
    return await createTokens({...userInfo, id: user.id, username: user.username})
}

export async function readUser(userId: string): Promise<User | null> {
    return await Users.getById(userId);
}

export async function searchUsers(): Promise<User[]> {
    return await Users.search();
}
