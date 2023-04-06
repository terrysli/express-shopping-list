const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");
const PRODUCT1 = {
  name: "product1",
  price: 100
};

beforeEach(function () {
  items.push(PRODUCT1);
});

afterEach(function () {
  items = [];
});

describe("GET /items", function () {
  test("valid", async function () {
    const resp = await request(app).get("/items");
    expect(resp.body).toEqual({items: [PRODUCT1]});
  });
});

describe("POST /items", function () {
  test("valid", async function () {
    const product2 = {
      name: "product2",
      price: 50
    }
    const resp = await request(app)
    .post("/items")
    .send(product2);
    expect(resp.body).toEqual({added: product2});
    console.log("items:", items);
    // TODO: potential test to add - but getting error of items not
    // mutating across files.
    // expect(items).toEqual([
    //   PRODUCT1,
    //   product2
    // ]);
  });
});

describe("GET /items/:name", function () {
  test("valid", async function () {
    const resp = await request(app).get("/items/product1");
    expect(resp.body).toEqual(PRODUCT1);
  });

  test("invalid", async function () {
    const resp = await request(app).get("/items/product9");
    expect(resp.status).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "Not Found",
        "status": 404
      }
    });
  });
});