const templates = {
  defaultTemplate: () => {
    const defaultTemplate = `
  <div id="app-container">
  
    <header>
      <span id="logo">TODO</span>
      <i id="change-theme" class="fas fa-sun"></i>
    </header>
  
    <div id="todo-input-container">
      <input type="checkbox" />
      <input id="new-todo" type="text" placeholder="Create a new todo..." />
    </div>
  </div>`;

    const templateHTML = toHTML(defaultTemplate.trim());

    return templateHTML;
  },
  todoListTemplate: () => {
    const todoListTemplateHTML = document.createElement("div");
    todoListTemplateHTML.id = "todo-list";
    todoListTemplateHTML.className = "show-all";
    return todoListTemplateHTML;
  },
  itemContainerTemplate: (itemObj) => {
    const { title, id, completed } = itemObj;
    const itemContainerTemplate = `
    <div id="${id}" class="todo-item-container">
    <input class="checkbox" type="checkbox"/>
    <label class="todo-label">${title}</label>
    <i class="edit fas fa-edit"></i>
    <i class="delete fas fa-trash-alt"></i>
  </div>
    `;

    const itemContainerTemplateHTML = toHTML(itemContainerTemplate.trim());

    return itemContainerTemplateHTML;
  },
  footerTemplate: (numberOfTodosLeft) => {
    const msg =
      numberOfTodosLeft > 1 ? `${numberOfTodosLeft} todos left` : `${numberOfTodosLeft} todo left`;

    const footerTemplate = `
    <footer>
    <span id="number-items-left">${msg}</span>
    <div>
      <span id="all">All</span>
      <span id="active">Active</span>
      <span id="completed">Completed</span>
    </div>
    <span id="clear">Clear completed</span>
  </footer>
    `;
    const footerTemplateHTML = toHTML(footerTemplate.trim());

    return footerTemplateHTML;
  },
  editOverlay: () => {
    const overlay = `
    <div class="edit-container-overlay">
      <div class="edit-container">
        <input class="edited-input" placeholder="Older text" type="text" />
        <button id="save-btn" class="btn">Save</button>
        <button id="cancel-btn" class="btn">Cancel</button>
      </div>
    </div>
    `;

    const overlayHTML = toHTML(overlay);

    return overlayHTML;
  },
};
const toHTML = (text) => {
  const template = document.createElement("template");
  template.innerHTML = text;
  return template.content;
  // return text;
};

export default templates;
