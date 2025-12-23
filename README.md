# Task Tracker Application

A comprehensive task management application built with **ReactJS** and **Redux Toolkit**, featuring full CRUD operations, advanced filtering, drag-and-drop reordering, statistics dashboard, and complete accessibility support.

![Task Tracker](https://img.shields.io/badge/React-18.3-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-purple) ![Vite](https://img.shields.io/badge/Vite-7.3-yellow)

## ✨ Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- ✅ **Task Status Management** - Toggle completion status
- ✅ **Advanced Filtering** - Filter by status (all/active/completed) and category
- ✅ **Real-time Search** - Debounced search across task titles and descriptions
- ✅ **Category Organization** - Organize tasks with predefined categories
- ✅ **Priority Levels** - Assign and visualize priority (high/medium/low)
- ✅ **Drag & Drop** - Reorder tasks with smooth drag-and-drop

### Bonus Features
- 📊 **Statistics Dashboard** - Visual analytics with Chart.js (pie, bar, and line charts)
- ⏮️ **Undo/Redo** - Full history management with keyboard shortcuts
- 💾 **Export/Import** - Download and upload tasks as JSON
- ⌨️ **Keyboard Navigation** - Complete keyboard shortcuts support
- ♿ **Accessibility** - ARIA labels, screen reader support, focus management

### Technical Highlights
- 🎨 **Modern UI Design** - Glassmorphism effects, smooth animations, vibrant colors
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 💾 **Data Persistence** - Automatic localStorage sync
- 🎯 **Redux Best Practices** - Redux Toolkit with memoized selectors
- 🚀 **Performance Optimized** - Efficient rendering and state updates

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📖 Usage Guide

### Keyboard Shortcuts
- `Ctrl+N` - Create new task
- `/` - Focus search bar
- `Ctrl+Z` - Undo last action
- `Ctrl+Y` or `Ctrl+Shift+Z` - Redo action
- `Esc` - Close modals/forms
- `Tab` - Navigate between elements

### Creating Tasks
1. Click "New Task" button or press `Ctrl+N`
2. Fill in task details:
   - **Title** (required)
   - **Description** (optional)
   - **Category** (General, Work, Personal, Shopping, Health, Finance)
   - **Priority** (Low, Medium, High)
3. Click "Add Task"

### Managing Tasks
- **Complete/Uncomplete** - Click the checkbox
- **Edit** - Click the edit icon
- **Delete** - Click the delete icon (with confirmation)
- **Reorder** - Drag and drop tasks

### Filtering & Search
- Use the filter buttons to view All/Active/Completed tasks
- Type in the search bar to find specific tasks
- Combine filters for precise results

### Dashboard
- View task statistics and completion rate
- Analyze tasks by category and priority
- Track task creation trends over the last 7 days
- Export all tasks as JSON
- Import tasks from JSON file

## 🏗️ Project Structure

```
task-tracker/
├── src/
│   ├── app/
│   │   └── store.js                 # Redux store configuration
│   ├── features/
│   │   ├── tasks/
│   │   │   ├── tasksSlice.js       # Tasks state & reducers
│   │   │   └── tasksSelectors.js   # Memoized selectors
│   │   └── filters/
│   │       └── filtersSlice.js     # Filters state
│   ├── components/
│   │   ├── TaskForm/               # Task creation/editing form
│   │   ├── TaskList/               # Task list with drag-and-drop
│   │   ├── TaskItem/               # Individual task card
│   │   ├── FilterBar/              # Status filter buttons
│   │   ├── SearchBar/              # Search input
│   │   └── Dashboard/              # Statistics & charts
│   ├── hooks/
│   │   └── useKeyboardShortcuts.js # Keyboard shortcuts hook
│   ├── utils/
│   │   ├── localStorage.js         # localStorage utilities
│   │   └── exportImport.js         # Export/import utilities
│   ├── styles/
│   │   ├── global.css              # Global styles
│   │   └── variables.css           # CSS custom properties
│   ├── App.jsx                     # Main application
│   └── main.jsx                    # Entry point
├── package.json
└── vite.config.js
```

## 🎨 Design System

### Color Palette
- **Primary**: Vibrant purple gradient
- **Priority High**: Red
- **Priority Medium**: Yellow
- **Priority Low**: Green
- **Dark Mode**: Default theme with light mode support

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive**: Scales from 13px (mobile) to 16px (desktop)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create, edit, and delete tasks
- [ ] Toggle task completion
- [ ] Filter by status and category
- [ ] Search tasks
- [ ] Drag and drop to reorder
- [ ] Use keyboard shortcuts
- [ ] Test undo/redo
- [ ] Export and import data
- [ ] Verify localStorage persistence (refresh page)
- [ ] Test responsive design on different screen sizes
- [ ] Validate accessibility with screen reader

## 🔧 Technologies Used

- **React 18.3** - UI library
- **Redux Toolkit 2.0** - State management
- **Vite 7.3** - Build tool
- **@hello-pangea/dnd** - Drag and drop
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js
- **uuid** - Unique ID generation

## 📝 Code Quality

- ✅ Clean, maintainable code with comments
- ✅ Modular component structure
- ✅ Reusable utility functions
- ✅ Proper error handling
- ✅ Accessibility best practices
- ✅ Responsive design patterns

## 🚀 Deployment

### Netlify (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify:
   - Drag and drop to [Netlify Drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

### Other Platforms
- **Vercel**: Connect GitHub repo or use Vercel CLI
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Built with ❤️ using React & Redux Toolkit**
