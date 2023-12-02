import { Logger as NestLogger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./application/common/filters";
import { LoggingInterceptor, ResponseMappingInterceptor } from "./application/common/interceptors";
import { WinstonLogger } from "./common/utils";
import { APP_CONFIG, CORS_CONFIG } from "./infrastructure/configs";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonLogger,
    });

    app.enableCors({
        origin: CORS_CONFIG.origin,
        credentials: CORS_CONFIG.credential,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "X-Authorization"],
    });

    // interceptors
    app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseMappingInterceptor());

    app.useGlobalFilters(new AllExceptionsFilter(new NestLogger("AllExceptionsFilter")));

    app.enableShutdownHooks();

    const PORT = APP_CONFIG.appPort;

    await app.listen(PORT);
    NestLogger.log(`File system service ready on port : ${PORT}`, "bootstrap");
}
bootstrap();
