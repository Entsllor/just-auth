import {ISettings} from "../../common/settings/settings.schemas";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";

export function generateSwaggerSchema(app: INestApplication, settings: ISettings) {
    const swaggerConfig = new DocumentBuilder()
        .setTitle(settings.APP_NAME)
        .setDescription(`The ${settings.APP_NAME} API description`)
        .setVersion(settings.APP_VERSION)
        .addBearerAuth()
        .build();
    return SwaggerModule.createDocument(app, swaggerConfig);
}
