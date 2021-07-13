export default class Store {
  #dbName = "";

  constructor(dbName) {
    this.#dbName = dbName;
    if (!localStorage.getItem(dbName)) this.createDB();
  }

  createDB() {
    localStorage.setItem(this.#dbName, JSON.stringify([]));
  }

  drop() {
    localStorage.removeItem(this.#dbName);
  }

  insert(query) {
    const db = this.db;
    db.push(query);
    this.db = db;
  }

  get db() {
    return JSON.parse(localStorage.getItem(this.#dbName));
  }

  set db(dbArray) {
    localStorage.setItem(this.#dbName, JSON.stringify(dbArray));
  }

  find(id) {
    for (const item of this.db) {
      if (item.id === id) return item;
    }
    alert("Provided id doesn't exist");
  }

  findAll(query) {
    const { title, completed, time } = query;

    const filteredItems = this.db.filter((item) => item.completed === completed);

    return filteredItems;
  }

  delete(id) {
    const filteredItemsArray = this.db.filter((item) => item.id !== id);

    this.db = filteredItemsArray;
  }

  update(id, query) {
    const { title, completed } = query;
    const db = this.db;
    for (const item of db) {
      if (item.id === id) {
        if (title !== undefined) item.title = title;
        if (completed !== undefined) item.completed = completed;
        break;
      }
    }

    this.db = db;
  }

  printDB() {
    console.log(this.db);
  }
}
