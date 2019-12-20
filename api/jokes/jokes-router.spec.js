const request = require("supertest");

const db = require("../../database/dbConfig.js");
const server = require("../server.js");

describe("/api/jokes", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("GET from /", function() {
    it("Should send a 400 if no user is logged in", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
    it("should send a 200 if user is logged in", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "BurgerKing", password: "Chalupa" })
        .then(res => {
          expect(res.status).toBe(201);
          return request(server)
            .post("/api/auth/login")
            .send({ username: "BurgerKing", password: "Chalupa" })
            .then(res => {
                const token = res.body.token
              expect(res.status).toBe(200);
              return request(server)
                .get("/api/jokes")
                .set("Authorization", token)
                .then(res => {
                  expect(res.status).toBe(200);
                });
            });
        });
    });
  });
});
