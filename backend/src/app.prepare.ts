import {INestApplication} from "@nestjs/common";
import {ISettings} from "./common/settings/settings.schemas";
import cookieParser from "cookie-parser";
import {HttpAdapterHost} from "@nestjs/core";
import {AllExceptionsFilter} from "./helpers/exceptions/all-exceptions.filter";
import {AppExceptionsFilter} from "./helpers/exceptions/app-exceptions.filter";
import {ZodValidationExceptionFilter} from "./helpers/exceptions/zod-exception.filter";
import {SwaggerModule} from "@nestjs/swagger";
import {generateSwaggerSchema} from "./helpers/docs/generate-swagger-schema";

export async function prepareApp(
    app: INestApplication,
    settings: ISettings,
    extra: {
        withSwagger?: boolean;
        updateFrontendApiClient?: boolean;
    }
) {
    app.use(cookieParser());
    {
        // exceptions filters
        const {httpAdapter} = app.get(HttpAdapterHost);
        app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
        app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));
        app.useGlobalFilters(new ZodValidationExceptionFilter(httpAdapter));
    }
    if (extra.withSwagger) {
        const document = generateSwaggerSchema(app, settings);
        SwaggerModule.setup(settings.SWAGGER_URL_PREFIX, app, document);
    }
}
