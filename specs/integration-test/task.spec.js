const request = require("supertest");

const app = require("./../../src/app");
const Task = require("./../../src/models/task").Task;
const sinon = require("sinon");

jest.mock("./../../src/middlewares/isAuth", () =>
  jest.fn((req, res, next) => {
    req.user = { _id: "123", email: "john@gmail.com", tokens: ["abcd"] };
    req.token = "abcd";
    next();
  })
);

describe("integration test for tasks router", () => {
  it("should return error as mandatory fields are missing", (done) => {
    request(app)
      .post("/tasks")
      .send({})
      .end((err, res) => {
        if (err) {
          done.fail();
        }

        expect(res.status).toEqual(400);
        done();
      });
  });

  it("should return 201 and set default value for completed", (done) => {
    sinon.stub(Task.prototype, "save").returnsThis();

    request(app)
      .post("/tasks")
      .send({ todo: "swim" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(201);
        done();
      });
  });

  it("should return 200 after updating the task by id", (done) => {
    const task = {
      todo: "drive",
      completed: false,
    };

    task.save = jest.fn();

    jest.spyOn(Task, "findOne").mockImplementation(() => {
      return Promise.resolve(task);
    });

    request(app)
      .patch("/tasks/2345678")
      .send({ todo: "swim" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ todo: "swim", completed: false });
        done();
      });
  });

  it("should return 404 when task is not found in db", (done) => {
    jest.spyOn(Task, "findOne").mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    request(app)
      .patch("/tasks/2345678")
      .send({ todo: "swim" })
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(404);

        done();
      });
  });

  it("should return 404 when task is not found in db while deleting", (done) => {
    jest.spyOn(Task, "findOneAndDelete").mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    request(app)
      .delete("/tasks/2345678")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(404);

        done();
      });
  });

  it("should return 200 when delete route is called", (done) => {
    const task = {
      todo: "drive",
      completed: false,
    };

    jest.spyOn(Task, "findOneAndDelete").mockImplementation(() => {
      return Promise.resolve(task);
    });

    request(app)
      .delete("/tasks/2345678")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);

        done();
      });
  });

  it("should return 200 when calling get all tasks", (done) => {
    const tasks = [
      {
        todo: "drive",
        completed: false,
        owner: "123",
      },
      {
        todo: "swim",
        completed: false,
        owner: "123",
      },
      {
        todo: "study",
        completed: false,
        owner: "0987",
      },
    ];

    jest.spyOn(Task, "find").mockImplementation(() => {
      const result = tasks.filter((task) => task.owner === "123");
      return Promise.resolve(result);
    });

    const expected = [
      {
        todo: "drive",
        completed: false,
        owner: "123",
      },
      {
        todo: "swim",
        completed: false,
        owner: "123",
      },
    ];

    request(app)
      .get("/tasks")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expected);
        done();
      });
  });

  it("should return 200 when calling get task by id", (done) => {
    const tasks = [
      {
        _id: "123",
        todo: "drive",
        completed: false,
        owner: "123",
      },
      {
        _id: "456",
        todo: "swim",
        completed: false,
        owner: "123",
      },
      {
        _id: "876",
        todo: "study",
        completed: false,
        owner: "0987",
      },
    ];

    jest.spyOn(Task, "findOne").mockImplementation(() => {
      const result = tasks.filter(
        (task) => task.owner === "123" && task._id === "123"
      );
      return Promise.resolve(result);
    });

    const expected = {
      _id: "123",
      todo: "drive",
      completed: false,
      owner: "123",
    };

    request(app)
      .get("/tasks/123")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(200);
        expect(res.body[0]).toEqual(expected);
        done();
      });
  });

  it("should return 404 when task is not found in db while retreiving by id", (done) => {
    jest.spyOn(Task, "findOne").mockImplementation(() => {
      return Promise.resolve(undefined);
    });

    request(app)
      .get("/tasks/2345678")
      .end((err, res) => {
        if (err) {
          done.fail();
        }
        expect(res.status).toEqual(404);

        done();
      });
  });
});
