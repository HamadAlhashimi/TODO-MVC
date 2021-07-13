export default class Model {
  #store = null;
  constructor(store) {
    this.#store = store;
  }

  addItem(title) {
    const id = `id${new Date().getTime()}`;
    this.#store.insert({
      title: title,
      completed: false,
      time: new Date().getTime(),
      id: id,
    });
    return id;
  }

  findItem(id) {
    return this.#store.find(id);
  }

  findAllItems(query) {
    return this.#store.findAll(query);
  }

  deleteItem(id) {
    this.#store.delete(id);
  }

  deleteAllCompleted() {
    const completedItems = this.findAllItems({ completed: true });

    for (const item of completedItems) {
      this.deleteItem(item.id);
    }
  }

  updateItem(id, query) {
    this.#store.update(id, query);
  }

  deleteDB() {
    this.#store.drop();
  }

  get db() {
    return this.#store.db;
  }

  get todoListMode() {
    return JSON.parse(localStorage.getItem("mode"));
  }

  set todoListMode(mode) {
    localStorage.setItem("mode", JSON.stringify(mode));
  }
}
