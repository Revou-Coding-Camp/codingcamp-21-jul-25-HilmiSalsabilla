const addBtn = document.getElementById('add-btn');
const filterBtn = document.getElementById('filter-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const todoList = document.getElementById('todo-list');

function createRow(task, date) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${task}</td>
    <td>${date}</td>
    <td>Pending</td>
    <td><button class="delete-btn">Delete</td>
  `;
  return tr;
}

function clearNoTaskMessage() {
  const noTask = document.querySelector('.no-task');
  if (noTask) noTask.remove();
}

addBtn.addEventListener('click', () => {
  const todoInput = document.getElementById('todo-input');
  const dueDateInput = document.getElementById('due-date');
  const task = todoInput.value.trim();
  const date = dueDateInput.value;

  //validasi
  if (!task || !date) {
    alert('Please fill in both fields!');
    return;
  }

  clearNoTaskMessage();
  const row = createRow(task, date);
  todoList.appendChild(row);

  //reset input
  todoInput.value = '';
  dueDateInput.value = '';
});

deleteAllBtn.addEventListener('click', (e) => {
  todoList.innerHTML = '<tr><td class="no-task" colspan="4" style="text-align: center;">No Task Found</td></tr>';
});

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('tr').remove();
    if (todoList.children.length === 0) {
      todoList.innerHTML = '<tr><td class="no-task" colspan="4" style="text-align: center;">No Task Found</td></tr>';
    }
  }
});

filterBtn.addEventListener('click', () => {
  const filterDate = document.getElementById('due-date').value;
  const rows = todoList.querySelector('tr');

  if (!filterDate) {
    alert('Please choose a date to filter!');
    return;
  }

  rows.forEach((row) => {
    const dateCell = row.children[1];
    if (dateCell && dateCell.textContent !== filterDate) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  });
});