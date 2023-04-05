"use strict";

/** Routes for items */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { items } = require("./fakeDb");

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
  return res.json({added: newItem});
});


// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });

module.exports = router;
