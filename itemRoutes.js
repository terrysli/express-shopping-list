"use strict";

/** Routes for items */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");

items.push({
  name: "product1",
  price: 100
});

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

return res.json({item});
});


// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });

module.exports = router;
