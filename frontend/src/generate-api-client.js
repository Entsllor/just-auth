import {generateApi} from "swagger-typescript-api"
import * as path from "node:path"
import * as process from "node:process"
import {config} from "dotenv"

config({path: "../.env"})
generateApi({
    output: path.resolve(process.cwd(), "./src/api"),
    url: `http://localhost:${process.env.BACKEND_PORT}/swagger-json`,
    name: "generated.ts",
    modular: false,
    httpClientType: "axios",
    defaultResponseAsSuccess: true,
    unwrapResponseData: true,
    hooks: {
        onFormatRouteName(routeInfo) {
            return routeInfo.operationId.split("_", 2).at(-1)
        }
    }
}).catch(console.error)
