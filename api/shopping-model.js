// items to add:
// id, shopping_items, isCompleted, isEdited

let id = 0;

function getId() {
  return ++id;
}

let shopping_items = [
  { id: getId(), shopping_item: "item1", isCompleted: false, isEdited: false },
  { id: getId(), shopping_item: "item2", isCompleted: true, isEdited: false },
];

module.exports = {
  async findAll() {
    // select * from shopping_items
    return shopping_items;
  },

  async findById(id) {
    // select * from shopping_items where id=1;
    const item = shopping_items.find((i) => i.id == id);
    return item;
  },

  async create(shopping_item) {
    // insert into shopping_items (id, shopping_item, isCompleted, isEdited) values (10, item3, false, false);
    const newItem = {
      id: getId(),
      shopping_item,
      isCompleted: false,
      isEdited: false,
    };
    shopping_items.push(newItem);
    return newItem;
  },

  async update(id, changes) {
    // update shopping_items set shopping_item='item3', isCompleted=true, isEdited=true;
    const item = shopping_items.find((item) => item.id == id);
    const updatedItem = { ...changes, id };
    shopping_items = shopping_items.map((i) => ((i.id = id) ? updatedItem : i));
    return updatedItem;
  },

  async delete(id) {
    // delete from shopping_items where id=1;
    const item = shopping_items.find((item) => item.id == id);
    if (!item) {
      return null;
    }
    shopping_items = shopping_items.filter((i) => i.id != id);
    return item;
  },
};
