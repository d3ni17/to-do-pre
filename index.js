const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const template = document.querySelector("#to-do__item-template");

const defaultItems = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

function getTasksFromDOM() {
  const taskTextElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];

  taskTextElements.forEach((element) => {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks !== null) {
    return JSON.parse(savedTasks);
  }
  return defaultItems;
}

function createItem(item) {
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate",
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskText = inputElement.value;

  if (taskText.trim() === "") {
    inputElement.value = "";
    return;
  }

  const newItem = createItem(taskText);
  listElement.prepend(newItem);
  saveTasks(getTasksFromDOM());
  inputElement.value = "";
});

// Инициализация приложения
const initialItems = loadTasks();
initialItems.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});
