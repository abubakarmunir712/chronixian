# Chronixian

Chronixian is a dark-themed, TypeScript React task management app with tasks, subtasks, and localStorage persistence, built with a vibe coding approach.

## Features
- Add, edit, delete tasks & subtasks
- Nested subtasks under tasks
- LocalStorage persistence
- Dark-themed glassmorphism design
- Fully typed with TypeScript
- Ready for JSON import/export
- Uses Shadcn UI and React Icons

## Tech Stack
- React + TypeScript
- Tailwind CSS v4.1
- Shadcn UI
- React Icons

## Getting Started
Clone the repo, install dependencies and run the development server: git clone <repo-url> && cd chronixo && npm install && npm run dev. Then open http://localhost:5173 in your browser.

## Folder Structure
src/ ├─ components/ │ ├─ ui/          ← reusable shadcn components │ └─ tasks/       ← app-specific task components ├─ hooks/           ← custom hooks (e.g., useLocalStorage) ├─ types/           ← TypeScript types ├─ App.tsx          ← main app component └─ main.tsx         ← entry point

## Usage
Add new tasks using the input at the top. Click a task to view subtasks and add/edit/delete them. All tasks persist in localStorage automatically.

## License
MIT License
