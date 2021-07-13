import templates from "./template.js";

export default class View {
  setDefaultTemplate() {
    const body = document.querySelector("body");
    body.insertBefore(templates.defaultTemplate(), body.firstChild);
  }

  setTodoListTemplate() {
    document.querySelector("#app-container").append(templates.todoListTemplate());
  }

  setFooter(length) {
    document.querySelector("#todo-list").append(templates.footerTemplate(length));
  }

  setTodo(todoItem) {
    const todoList = document.querySelector("#todo-list");
    const item = templates.itemContainerTemplate(todoItem);
    if (todoItem.completed) {
      // alert();
      this.crossItem(item);
      item.querySelector(".checkbox").checked = true;
    }
    todoList.insertBefore(item, todoList.firstChild);
  }

  updateTodo(id, text) {
    document.querySelector(`#${id}`).querySelector("label").innerText = text;
  }

  populateTodos(todos) {
    for (const item of todos) {
      this.setTodo(item);
    }
  }

  clearTodoList() {
    document.querySelector("#todo-list").innerHTML = "";
  }

  removeTodoList() {
    document.querySelector("#todo-list").remove();
  }

  removeItemFromList(itemID) {
    document.querySelector(`#${itemID}`).remove();
  }

  updateNumberOfItemsLeft(numberOfTodosLeft) {
    const msg =
      numberOfTodosLeft > 1 ? `${numberOfTodosLeft} todos left` : `${numberOfTodosLeft} todo left`;
    document.querySelector("#number-items-left").innerText = msg;
  }

  setEditOverlay() {
    const appContainer = document.querySelector("#app-container");
    // console.log(templates.editOverlay());
    appContainer.append(templates.editOverlay());
  }

  showEditOverlay() {
    const editOverlayElement = document.querySelector(".edit-container-overlay");

    editOverlayElement.classList.add("show");
    editOverlayElement.classList.remove("hide");
  }

  hideEditOverlay() {
    const editOverlayElement = document.querySelector(".edit-container-overlay");

    editOverlayElement.classList.add("hide");
    editOverlayElement.classList.remove("show");
  }

  crossItem(htmlFragmentItem) {
    // console.log(htmlFragmentItem.classList);
    if (!htmlFragmentItem.classList) {
      htmlFragmentItem.firstChild.classList.add("checked");
    } else {
      htmlFragmentItem.classList.add("checked");
    }
  }

  uncrossItem(htmlFragmentItem) {
    if (!htmlFragmentItem.classList) {
      htmlFragmentItem.firstChild.classList.remove("checked");
    } else {
      htmlFragmentItem.classList.remove("checked");
    }
  }

  setTodoListMode(mode) {
    document.querySelector("#todo-list").className = mode;
  }

  removeCompletedItems(items) {
    for (const item of items) {
      this.removeItemFromList(item.id);
    }
  }
}
