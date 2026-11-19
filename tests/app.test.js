const request = require("supertest");
const app = require("../src/server");

describe("Docker CI/CD Application", () => {

    test("GET / should return 200", async () => {

        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toBe("Docker CI/CD Application Running");
    });

    test("GET /health should return OK", async () => {

        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("OK");
    });

    test("POST /notes should create a note", async () => {

        const response = await request(app)
            .post("/notes")
            .send({
                title: "Docker",
                content: "Learning multi-stage builds"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Docker");
    });

});
