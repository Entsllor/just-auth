export async function prepareResponse<DataOut extends Partial<DataIn>, DataIn>(parser: { validate: (data: any) => Promise<DataOut> }, data: DataIn) {
    return await parser.validate(data)
}