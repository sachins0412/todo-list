const request = require("supertest");

const app = require("./../../src/app");
const User = require("./../../src/models/user").User;
const sinon = require("sinon");

jest.mock("./../../src/middlewares/isAuth", () =>
  jest.fn((req, res, next) => {
    req.user = { email: "john@gmail.com", tokens: ["abcd"] };
    req.token = "abcd";
    req.user.save = jest.fn();
    next();
  })
);

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

  it("should return 201 after accepting correct body", (done) => {
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

  it("should return 200 when user logs out", (done) => {
    request(app)
      .post("/users/logout")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);
        expect(res.text).toEqual("Logged off successfully");

        done();
      });
  });
});
