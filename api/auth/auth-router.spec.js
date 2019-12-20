const request = require("supertest");

const db = require("../../database/dbConfig.js");
const server = require("../server.js");

describe("/api/auth", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("POST to /register", function() {
    it("Should send a 201 created", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Tacobell", password: "Chalupa" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("Should send a 400 if Username is missing", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ password: "Mellow Yellow" })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe("POST to /login", function() {
    it("Should send a 200 on login", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Tacobell", password: "Chalupa" })
        .then(res => {
          expect(res.status).toBe(201);
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Tacobell", password: "Chalupa" })
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });
    it("Should send a 401 if password is incorrect", function(){
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Tacobell", password: "Chalupa" })
        .then(res => {
          expect(res.status).toBe(201);
          return request(server)
            .post("/api/auth/login")
            .send({ username: "Tacobell", password: "Burrito" })
            .then(res => {
              expect(res.status).toBe(401);
            });
        });
    })
  });
});
