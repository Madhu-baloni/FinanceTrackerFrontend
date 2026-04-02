# FinanceOS — Personal Finance Dashboard

A full-featured finance dashboard built with **React + MUI (Material UI)**.

## Features

- **Dashboard Overview** — Summary cards, balance trend chart, spending pie/bar charts
- **Transactions Section** — Searchable, filterable, sortable table with pagination
- **Role-Based UI** — Admin (add/edit/delete) and Viewer (read-only) roles via dropdown
- **Insights Section** — Highest spending category, monthly comparison, financial health score
- **Dark Mode** — Full dark/light theme toggle
- **Data Persistence** — Auto-saves to localStorage
- **Export** — Download transactions as CSV or JSON

## Tech Stack

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

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx         # Global state (useReducer + Context API)
├── data/
│   └── mockData.js            # 35+ mock transactions + category config
├── utils/
│   └── helpers.js             # Filter, sort, format, export, insights
├── components/
│   ├── Navbar.jsx             # Top bar: role switcher + dark mode
│   ├── SummaryCards.jsx       # KPI cards: balance, income, expenses, savings
│   ├── Charts.jsx             # AreaChart, PieChart, BarChart (Recharts)
│   ├── InsightsSection.jsx    # Insights: top category, monthly diff, health
│   ├── TransactionsSection.jsx# Full transaction table with filter/sort/search
│   ├── TransactionDialog.jsx  # Add/Edit modal (Admin only)
│   └── Dashboard.jsx          # Main page layout
└── App.jsx                    # MUI ThemeProvider + AppProvider wrapper
```

## Role Simulation

Switch roles using the dropdown in the top-right navbar:

| Role   | Permissions                        |
|--------|------------------------------------|
| Admin  | View + Add + Edit + Delete         |
| Viewer | View only (no action buttons shown)|

