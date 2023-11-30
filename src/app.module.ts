import { Logger, MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { authMiddleware, trackingMiddleware } from "./application/common/middlewares";
import { DatabaseModule } from "./infrastructure/database";

@Module({
    imports: [DatabaseModule],
    controllers: [AppController],
    providers: [AppService, Logger],
})
export class AppModule {
    constructor() {}

    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(trackingMiddleware).forRoutes("*").apply(authMiddleware).forRoutes("v1/*");
    }

    beforeApplicationShutdown(_signal?: string) {}
}
