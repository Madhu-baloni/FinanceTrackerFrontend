import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEY = 'finance_dashboard_state';

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
};

const initialState = loadState() || {
  transactions: initialTransactions,
  role: 'admin',
  darkMode: false,
  filters: {
    search: '',
    type: 'all',
    category: 'all',
    dateRange: '90',
  },
  sort: { field: 'date', direction: 'desc' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'RESET_FILTERS':
      return {
        ...state,
        filters: { search: '', type: 'all', category: 'all', dateRange: '90' },
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
