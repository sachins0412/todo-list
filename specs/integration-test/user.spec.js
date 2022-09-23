const request = require("supertest");

const app = require("./../../src/app");
const User = require("./../../src/models/user").User;
const sinon = require("sinon");

describe("integration test for user", () => {
  it("should return error as mandatory fields are missing", (done) => {
    request(app)
      .post("/users")
      .send({ name: "john" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }

        expect(res.status).toEqual(400);
        done();
      });
  });

  it("should return 201 after accepting current body", (done) => {
    sinon.stub(User.prototype, "save").returnsThis();
    jest
      .spyOn(User.prototype, "generateAuthToken")
      .mockImplementation(() => "abcd");

    request(app)
      .post("/users")
      .send({ name: "john", email: "john@gmail.com", password: "12345678" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(201);
        done();
      });
  });

  it("should return 200 when user logs in", (done) => {
    const expected = {
      name: "John",
      email: "john@gmail.com",
      password: "12345678",
      generateAuthToken: () => {
        Promise.resolve("abcd");
      },
    };

    jest
      .spyOn(User, "findByCredentials")
      .mockImplementation(({ email, password }) => {
        if (email === expected.email && password === expected.password) {
          return Promise.resolve(expected);
        } else {
          return Promise.reject();
        }
      });

    request(app)
      .post("/users/login")
      .send({ email: "john@gmail.com", password: "12345678" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);

        done();
      });
  });
});
