// --- State ---
let todos = [];
let currentFilter = 'all';

// --- DOM refs ---
const inputEl     = document.getElementById('todo-input');
const addBtn      = document.getElementById('add-btn');
const listEl      = document.getElementById('todo-list');
const countEl     = document.getElementById('task-count');
const selectAllBtn = document.getElementById('select-all-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns  = document.querySelectorAll('.filter-btn');

// --- Load from localStorage ---
function loadTodos() {
  const stored = localStorage.getItem('todos');
  if (stored) {
    try { todos = JSON.parse(stored); } catch (_) { todos = []; }
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// --- Render ---
function render() {
  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  listEl.innerHTML = '';

  if (filtered.length === 0) {
    listEl.innerHTML = '<div class="empty-state">✨ No tasks to show</div>';
  } else {
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.completed ? ' completed' : '');
      li.dataset.id = todo.id;

      li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" title="Delete">✕</button>
      `;

      // --- Event listeners ---
      const cb = li.querySelector('.todo-checkbox');
      cb.addEventListener('change', () => toggleTodo(todo.id));

      const textSpan = li.querySelector('.todo-text');
      textSpan.addEventListener('click', () => toggleTodo(todo.id));

      const delBtn = li.querySelector('.delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
      });

      listEl.appendChild(li);
    });
  }

  updateCount();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function updateCount() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  countEl.textContent = `${total} task${total !== 1 ? 's' : ''} (${completed} done)`;
}

// --- Actions ---
function addTodo() {
  const text = inputEl.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    text,
    completed: false,
  });

  inputEl.value = '';
  saveTodos();
  render();
  inputEl.focus();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
}

function selectAll() {
  const allCompleted = todos.every(t => t.completed);
  todos.forEach(t => (t.completed = !allCompleted));
  saveTodos();
  render();
}

// --- Filter ---
function setFilter(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

// --- Keyboard ---
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// --- Init ---
loadTodos();
render();

// --- Event bindings ---
addBtn.addEventListener('click', addTodo);
clearCompletedBtn.addEventListener('click', clearCompleted);
selectAllBtn.addEventListener('click', selectAll);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});
