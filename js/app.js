import Store from "./store.js";
import Model from "./model.js";
import View from "./view.js";
import Controller from "./controller.js";

class TODO {
  #model;
  #view;
  #controller;
  constructor(dbName) {
    this.#model = new Model(new Store(dbName));
    this.#view = new View();
    this.#controller = new Controller(this.#model, this.#view);
  }

  init() {
    this.#controller.setDefaultTemplate();
    this.#controller.addListeners();
  }
}

const todo = new TODO("DB");

window.onload = () => {
  todo.init();
};
