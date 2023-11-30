import { Controller, Get, HttpCode } from "@nestjs/common";
import { DataResponse } from "./application/response";

@Controller()
export class AppController {
    constructor() {}

    @Get()
    getHomePage() {
        return new DataResponse({ service: "File System Service", version: "v1" });
    }

    @Get("favicon.ico")
    @HttpCode(204)
    getFavicon() {}
}
