import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    // it("/ GET - should return service information (name and version)", () => {
    //     return request(app.getHttpServer())
    //         .get("/")
    //         .expect(200)
    //         .expect({
    //             code: 200,
    //             message: "OK",
    //             data: { service: "File System Service", version: "v1" },
    //         });
    // });
});
