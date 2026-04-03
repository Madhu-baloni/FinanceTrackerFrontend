Finance DashBoard

 Built with **React + MUI (Material UI)**.

## Features

- **Dashboard Overview** — Summary cards, balance trend chart, spending pie/bar charts
- **Transactions Section** — Searchable, filterable, sortable table with pagination
- **Role-Based UI** — Admin (add/edit/delete) and Viewer (read-only) roles via dropdown
- **Insights Section** — Highest spending category, monthly comparison, financial health score
- **Dark Mode** — Full dark/light theme toggle
- **Data Persistence** — Auto-saves to localStorage
- **Export** — Download transactions as CSV or JSON

## Tech Stack are used : 

- React 18
- MUI v5 (Material UI)
- Recharts (charts)
- date-fns (date utilities)
- React Context + useReducer (state management)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
```

App opens at http://localhost:3000


## Switch roles using the dropdown in the top-right navbar:
```bash
Role 1 : - Admin

Role 2 : - Viewer
```

## Future Improvements

Role-based access control (RBAC): The app currently supports two user roles — Admin and Viewer — defined in the codebase but not yet fully implemented.

Admin: Will have full access to add, edit, and delete transactions and categories.
Viewer: Will have read-only access to view reports and balance trends.
Authentication and role enforcement are planned for a future release.