export default class Controller {
  #model;
  #view;
  ENTER_CODE = "Enter";
  NUM_PAD_ENTER_CODE = "NumpadEnter";
  DELETE_CODE = "Backspace";
  ESCAPE_CODE = "Escape";

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  addListeners() {
    const inputElement = document.querySelector("#new-todo");
    inputElement.onkeydown = (e) => {
      if ((e.code === this.ENTER_CODE) | (e.code === this.NUM_PAD_ENTER_CODE)) {
        if (!inputElement.value.trim()) return false;

        const id = this.#model.addItem(inputElement.value.trim());

        if (!document.querySelector("#todo-list")) {
          this.#view.setTodoListTemplate();
          this.#view.setFooter(this.#model.findAllItems({ completed: false }).length);
        }

        this.#view.setTodo(this.#model.findItem(id));
        this.#view.updateNumberOfItemsLeft(this.#model.findAllItems({ completed: false }).length);
        inputElement.value = null;
        this.addListeners();
      }
    };

    const deleteIconElements = document.querySelectorAll(".delete");
    for (const deleteIconElement of deleteIconElements) {
      deleteIconElement.onclick = (e) => {
        const id = deleteIconElement.parentElement.id;
        this.#view.removeItemFromList(id);
        this.#model.deleteItem(id);
        this.#view.updateNumberOfItemsLeft(this.#model.findAllItems({ completed: false }).length);
        if (!this.#model.db.length) this.removeTodoList();
      };
    }

    const editIconElements = document.querySelectorAll(".edit");
    for (const editIconElement of editIconElements) {
      editIconElement.onclick = (e) => {
        const id = e.target.parentElement.id;
        this.#setTextToBeEdited(id);

        this.#view.showEditOverlay();

        const saveBtnElement = document.querySelector("#save-btn");
        saveBtnElement.onclick = this.#handelSaveBtn.bind(this, id);

        const cancelBtnElement = document.querySelector("#cancel-btn");
        cancelBtnElement.onclick = this.#handelCancelBtn.bind(this);

        const inputElement = document.querySelector(".edited-input");
        inputElement.onkeydown = this.#handelActionsByKeyboardClicks.bind(this, id);
      };
    }

    const checkboxElements = document.querySelectorAll(".checkbox");
    for (const checkboxElement of checkboxElements) {
      checkboxElement.onchange = this.#handelCheckboxes.bind(this, checkboxElement);
    }

    if (!document.querySelector("footer")) return;

    const showCompletedItemsElement = document.querySelector("#completed");
    showCompletedItemsElement.onclick = this.#handelShowCompleted.bind(this);

    const showActiveItemsElement = document.querySelector("#active");
    showActiveItemsElement.onclick = this.#handelShowActiveItems.bind(this);

    const showAllItemsElement = document.querySelector("#all");
    showAllItemsElement.onclick = this.#handelShowAllItems.bind(this);

    const clearCompletedElement = document.querySelector("#clear");
    clearCompletedElement.onclick = this.#handelClearCompleted.bind(this);
  }

  #handelClearCompleted() {
    const completedItems = this.#model.findAllItems({ completed: true });
    this.#model.deleteAllCompleted();
    this.#view.removeCompletedItems(completedItems);
    if (!this.#model.db.length) this.removeTodoList();
  }

  #handelShowAllItems() {
    this.#view.clearTodoList();
    this.#view.populateTodos(this.#model.db);
    this.#view.setFooter(this.#model.findAllItems({ completed: false }).length);
    this.#view.setTodoListMode("show-all");
    this.#model.todoListMode = "show-all";
    this.addListeners();
  }

  #handelShowCompleted() {
    const completedItems = this.#model.findAllItems({ completed: true });
    this.#view.clearTodoList();
    this.#view.populateTodos(completedItems);
    this.#view.setFooter(this.#model.findAllItems({ completed: false }).length);
    this.#view.setTodoListMode("show-completed");
    this.#model.todoListMode = "show-completed";
    this.addListeners();
  }

  #handelShowActiveItems() {
    const activeItems = this.#model.findAllItems({ completed: false });
    this.#view.clearTodoList();
    this.#view.populateTodos(activeItems);
    this.#view.setFooter(activeItems.length);
    this.#view.setTodoListMode("show-active");
    this.#model.todoListMode = "show-active";
    this.addListeners();
  }

  #handelCheckboxes(checkboxElement) {
    const id = checkboxElement.parentElement.id;
    if (checkboxElement.checked) {
      this.#model.updateItem(id, { completed: true });
      // console.log(checkboxElement.parentElement);
      this.#view.crossItem(checkboxElement.parentElement);
    } else {
      this.#model.updateItem(id, { completed: false });
      this.#view.uncrossItem(checkboxElement.parentElement);
    }

    const numberOfNotCompletedItems = this.#model.findAllItems({ completed: false }).length;

    this.#view.updateNumberOfItemsLeft(numberOfNotCompletedItems);
  }

  #setTextToBeEdited(id) {
    const item = this.#model.findItem(id);
    const inputElement = document.querySelector(".edited-input");
    inputElement.value = item.title;
  }

  #handelSaveBtn(id) {
    const inputElement = document.querySelector(".edited-input");
    if (!inputElement.value) return;
    this.#model.updateItem(id, { title: inputElement.value });
    this.#view.updateTodo(id, inputElement.value);
    inputElement.value = "";
    this.#view.hideEditOverlay();
  }

  #handelActionsByKeyboardClicks(id, e) {
    switch (e.code) {
      case this.ENTER_CODE:
        this.#handelSaveBtn(id);
        break;
      case this.NUM_PAD_ENTER_CODE:
        this.#handelSaveBtn(id);
        break;
      case this.ESCAPE_CODE:
        this.#handelCancelBtn();
        break;
      default:
        return true;
    }
  }

  #handelCancelBtn() {
    this.#view.hideEditOverlay();
  }

  setTodoList() {
    this.#view.setTodoListTemplate();
    this.#view.setFooter(this.#model.findAllItems({ completed: false }).length);
    if (!this.#model.todoListMode | (this.#model.todoListMode === "show-all")) {
      this.#view.populateTodos(this.#model.db);
      this.#model.todoListMode = "show-all";
    } else if (this.#model.todoListMode === "show-completed") {
      this.#handelShowCompleted();
    } else if (this.#model.todoListMode === "show-active") {
      this.#handelShowActiveItems();
    } else {
      console.log("something went wrong in setTodoList()");
    }
  }

  removeTodoList() {
    this.#view.removeTodoList();
  }

  setDefaultTemplate() {
    this.#view.setDefaultTemplate();
    this.#view.setEditOverlay();
    this.#model.todoListMode = "show-all";
    if (this.#model.db.length) this.setTodoList();
  }
}
