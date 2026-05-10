# ds4-bench

A simple, clean Todo App built with vanilla HTML, CSS, and JavaScript.

## 📁 Project Structure

```
ds4-bench/
├── README.md
└── todo-app/
    ├── index.html      # Main HTML structure
    ├── style.css       # Styling with gradient background
    └── app.js          # App logic with localStorage persistence
```

## 🚀 Features

- **Add tasks** – Type and press Enter or click Add
- **Toggle completion** – Click checkbox or text to mark as done/undone
- **Delete tasks** – Click the ✕ button to remove
- **Filter tasks** – All / Active / Completed tabs
- **Select All** – Toggle all tasks at once
- **Clear Completed** – Remove all completed tasks in one click
- **Persistent storage** – Tasks saved to `localStorage`, survive page reloads
- **Smooth animations** – New tasks slide in gently
- **Responsive** – Works on mobile and desktop

## ▶️ How to Run

Open `todo-app/index.html` in your browser directly, or serve with any static server:

```bash
# Using Python
python3 -m http.server 8000
# Then open http://localhost:8000/todo-app/
```

Or with Node.js:

```bash
npx serve .
```
