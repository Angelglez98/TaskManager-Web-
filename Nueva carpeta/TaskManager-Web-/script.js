
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Recuperar tareas guardadas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guardar tareas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mostrar tareas
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Marcar tarea como completada
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Botón eliminar
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete");

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Agregar tarea
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// Mostrar tareas al iniciar
renderTasks();
