const express = require("express");
const Shopping_items = require("./shopping-model.js");

const server = express();
server.use(express.json());

// get endpoint:
server.get("/", (req, res) => {
  res.json({ message: "Welcome to shopping list API!" });
});

// get items endpoint:
server.get("/api/shopping_items", (req, res) => {
  Shopping_items.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// get by id:
server.get("/api/shopping_items/:id", (req, res) => {
  const { id } = req.params;
  Shopping_items.findById(id)
    .then((item) => {
      item
        ? res.status(200).json(item)
        : res.status(404).json({ message: `no shopping item with id ${id}` });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// insert/port shopping_items:
server.post("/api/shopping_items", async (req, res) => {
  // EXPRESS, BY DEFAULT IS NOT PARSING THE BODY OF THE REQUEST
  // 1- gather info from the request object
  const item = req.body;

  // crude validation of req.body
  if (!item.shopping_item) {
    res.status(400).json({ message: "shopping item is required" });
  } else {
    try {
      // 2- interact with db
      const newlyCreatedItem = await Shopping_items.create(item);
      // 3- send appropriate response
      res.status(201).json(newlyCreatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

// update shopping items
server.put("/api/shopping_items/:id", async (req, res) => {
  // 1- pull info from req
  const changes = req.body;
  const { id } = req.params;

  // crude validation of req.body
  if (
    !changes.Shopping_item ||
    !changes.isCompleted ||
    changes.isEdited === undefined
  ) {
    res
      .status(400)
      .json({ message: "shoppingItem, iscompleted and IsEdited are required" });
  } else {
    try {
      // 2- interact with db through helper
      const updatedItem = await Shopping_items.update(id, changes);
      // 3- send appropriate response
      if (updatedItem) {
        res.status(200).json(updatedItem);
      } else {
        res
          .status(404)
          .json({ message: "shoppingItem not found with id " + id });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = server;
