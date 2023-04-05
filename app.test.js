const request = require("supertest");

const app = require("./app");
let { items } = require("./fakeDb");
const PRODUCT1 = {
  name: "product 1",
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
      name: "product 2",
      price: 50
    }
    const resp = await request(app)
    .post("/items")
    .send(product2);
    expect(resp.body).toEqual({added: product2});
    console.log("items:", items);
    expect(items).toEqual([
      PRODUCT1,
      product2
    ]);
  });
});