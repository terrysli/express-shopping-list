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
    const resp = await request(app).get(`/items/${PRODUCT1.name}`);
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

describe("PATCH /items/:name", function () {
  test("valid change all", async function () {
    const patchData = {name:"Troll", price: 1.00};
    const resp = await request(app)
      .patch(`/items/${PRODUCT1.name}`)
      .send(patchData);
    expect(resp.body).toEqual({updated: patchData});
  });

  test("valid change one", async function () {
    const resp = await request(app)
      .patch(`/items/${PRODUCT1.name}`)
      .send({price: 1});
    expect(resp.body).toEqual({updated: {name: PRODUCT1.name, price: 1}});
  });

  test("invalid doesn't exist", async function () {
    const resp = await request(app)
      .patch("/items/product9")
      .send({price: 1});
    expect(resp.status).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "Not Found",
        "status": 404
      }
    });
  });
});

describe("DELETE /items/:name", function () {
  test("valid", async function () {
    const resp = await request(app).delete(`/items/${PRODUCT1.name}`);
    expect(resp.body).toEqual({message: "Deleted"});
  });

  test("invalid", async function () {
    const resp = await request(app).delete("/items/product9");
    expect(resp.status).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "Not Found",
        "status": 404
      }
    });
  });
});