"use strict";

/** Routes for items */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");

/** GET /items: get list of items
 * Return { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
  ]}
 */
router.get("/", function (req, res) {
  return res.json({items});
});


/** POST /items: add item and return it
 * {name: "popsicle", price: 1.45} =>
  {added: {name: "popsicle", price: 1.45}}
*/
router.post("/", function (req, res) {
  const newItem = req.body;
  items.push(newItem);
  console.log("items in itemRoutes", items);
  return res.json({added: newItem});
});

/**
 * GET /items/:name: return a single item
 * {name: "popsicle", "price": 1.45}
 */
router.get("/:name", function(req, res) {
  const item = items.find((i) => i.name === req.params.name);

  if (item === undefined) {
    throw new NotFoundError();
  }

return res.json(item);
});

/**
 * PATCH /items/:name:  update a single item
 * Expect JSON input
 * Returns JSON: {updated: {name: "new popsicle", price: 2.45}}
 */
router.patch("/:name", function(req, res) {
  const item = items.find((i) => i.name === req.params.name);

  if (item === undefined) {
    throw new NotFoundError();
  }

  for (const prop in req.body) {
    item[prop] = req.body[prop];
  }

return res.json({updated:item});
});


/** DELETE /items/:name: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
  const idx = items.findIndex((i) => i.name === req.params.name);

  if (idx === -1) {
    throw new NotFoundError();
  }

  items.splice(idx, 1);

  return res.json({ message: "Deleted" });
});

module.exports = router;
