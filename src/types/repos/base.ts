interface BaseRepo<T> {
    getOne(...args: any[]): T | undefined;

    getMany(...args: any[]): T[] | undefined;

    delete(...args: any[]): number;

    update(...args: any[]): number;
}
