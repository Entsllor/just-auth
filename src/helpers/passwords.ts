export async function hashPassword(rawPassword: string): Promise<string> {
    return await Bun.password.hash(rawPassword);
}

export async function verifyPassword(rawPassword: string, passwordHash: string): Promise<boolean> {
    return await Bun.password.verify(rawPassword, passwordHash);
}