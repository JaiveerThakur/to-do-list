import { v4 as uuidV4 } from "uuid";
import { Task } from '../types/static';


const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
/** const form = document.getElementById("#new-task-form")
 * getElementById expects Document.getElementById(elementId: string): HTMLElement | null so we cannot declare specific types but for typescript to undrstand specific type of element we can do delcartion as below
 * cosnt form = document.getElementById("#new-task-form") as HTMLFormElement | null*/
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault();
  //adding check for input value is present or not
  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  addListItem(newTask);
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  document.addEventListener("change", () => {
    task.completed = checkbox.checked
    console.log(tasks)
    saveTasks()
  })
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS");
  if (taskJson == null) return []
  return JSON.parse(taskJson)
}