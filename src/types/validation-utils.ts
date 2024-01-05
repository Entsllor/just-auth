export type ValidatorType<T = any> = {
    validate: (data: any) => Promise<T>;
};
