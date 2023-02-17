"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.use('/favicon-*', (_, res) => res.send());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Api Filmgem')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customCssUrl: process.env.SWAGGER_CSS,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map