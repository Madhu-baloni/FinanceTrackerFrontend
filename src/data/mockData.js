import { subDays, format } from 'date-fns';

const today = new Date();

export const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Housing',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Education',
  'Utilities',
  'Travel',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
];

export const CATEGORY_COLORS = {
  'Food & Dining': '#FF6B6B',
  Shopping: '#4ECDC4',
  Housing: '#45B7D1',
  Transportation: '#96CEB4',
  Entertainment: '#FFEAA7',
  Healthcare: '#DDA0DD',
  Education: '#98D8C8',
  Utilities: '#F7DC6F',
  Travel: '#BB8FCE',
  Salary: '#52BE80',
  Freelance: '#5DADE2',
  Investment: '#F0B27A',
  Other: '#AAB7B8',
};

let idCounter = 1;
const makeId = () => String(idCounter++).padStart(4, '0');

export const generateTransactions = () => [
  // === MONTH: current month ===
  { id: makeId(), date: format(subDays(today, 1), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 85000, type: 'income', category: 'Salary' },
  { id: makeId(), date: format(subDays(today, 2), 'yyyy-MM-dd'), description: 'Grocery Store - BigBasket', amount: 3200, type: 'expense', category: 'Food & Dining' },
  { id: makeId(), date: format(subDays(today, 3), 'yyyy-MM-dd'), description: 'Uber Ride', amount: 450, type: 'expense', category: 'Transportation' },
  { id: makeId(), date: format(subDays(today, 4), 'yyyy-MM-dd'), description: 'Netflix Subscription', amount: 649, type: 'expense', category: 'Entertainment' },
  { id: makeId(), date: format(subDays(today, 5), 'yyyy-MM-dd'), description: 'Amazon Shopping', amount: 4800, type: 'expense', category: 'Shopping' },
  { id: makeId(), date: format(subDays(today, 6), 'yyyy-MM-dd'), description: 'Freelance Project - UI Design', amount: 25000, type: 'income', category: 'Freelance' },
  { id: makeId(), date: format(subDays(today, 7), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 1800, type: 'expense', category: 'Utilities' },
  { id: makeId(), date: format(subDays(today, 8), 'yyyy-MM-dd'), description: 'Restaurant - Zomato', amount: 1200, type: 'expense', category: 'Food & Dining' },
  { id: makeId(), date: format(subDays(today, 9), 'yyyy-MM-dd'), description: 'Home Rent', amount: 18000, type: 'expense', category: 'Housing' },
  { id: makeId(), date: format(subDays(today, 10), 'yyyy-MM-dd'), description: 'Doctor Consultation', amount: 800, type: 'expense', category: 'Healthcare' },
  { id: makeId(), date: format(subDays(today, 11), 'yyyy-MM-dd'), description: 'Online Course - Udemy', amount: 1299, type: 'expense', category: 'Education' },
  { id: makeId(), date: format(subDays(today, 12), 'yyyy-MM-dd'), description: 'Mutual Fund Return', amount: 5500, type: 'income', category: 'Investment' },
  { id: makeId(), date: format(subDays(today, 13), 'yyyy-MM-dd'), description: 'Mobile Recharge', amount: 399, type: 'expense', category: 'Utilities' },
  { id: makeId(), date: format(subDays(today, 14), 'yyyy-MM-dd'), description: 'Coffee Shop', amount: 350, type: 'expense', category: 'Food & Dining' },
  { id: makeId(), date: format(subDays(today, 15), 'yyyy-MM-dd'), description: 'Clothing - H&M', amount: 3500, type: 'expense', category: 'Shopping' },
  // === 30-45 days ago ===
  { id: makeId(), date: format(subDays(today, 32), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 85000, type: 'income', category: 'Salary' },
  { id: makeId(), date: format(subDays(today, 33), 'yyyy-MM-dd'), description: 'Grocery Store', amount: 2900, type: 'expense', category: 'Food & Dining' },
  { id: makeId(), date: format(subDays(today, 34), 'yyyy-MM-dd'), description: 'Metro Card Recharge', amount: 500, type: 'expense', category: 'Transportation' },
  { id: makeId(), date: format(subDays(today, 35), 'yyyy-MM-dd'), description: 'Home Rent', amount: 18000, type: 'expense', category: 'Housing' },
  { id: makeId(), date: format(subDays(today, 36), 'yyyy-MM-dd'), description: 'Amazon Shopping', amount: 2200, type: 'expense', category: 'Shopping' },
  { id: makeId(), date: format(subDays(today, 37), 'yyyy-MM-dd'), description: 'Spotify Premium', amount: 119, type: 'expense', category: 'Entertainment' },
  { id: makeId(), date: format(subDays(today, 38), 'yyyy-MM-dd'), description: 'Freelance - Web Dev', amount: 18000, type: 'income', category: 'Freelance' },
  { id: makeId(), date: format(subDays(today, 39), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 1650, type: 'expense', category: 'Utilities' },
  { id: makeId(), date: format(subDays(today, 40), 'yyyy-MM-dd'), description: 'Petrol', amount: 2000, type: 'expense', category: 'Transportation' },
  { id: makeId(), date: format(subDays(today, 41), 'yyyy-MM-dd'), description: 'Pharmacy', amount: 650, type: 'expense', category: 'Healthcare' },
  { id: makeId(), date: format(subDays(today, 42), 'yyyy-MM-dd'), description: 'Restaurant Dinner', amount: 2100, type: 'expense', category: 'Food & Dining' },
  // === 60-75 days ago ===
  { id: makeId(), date: format(subDays(today, 62), 'yyyy-MM-dd'), description: 'Monthly Salary', amount: 85000, type: 'income', category: 'Salary' },
  { id: makeId(), date: format(subDays(today, 63), 'yyyy-MM-dd'), description: 'Grocery Shopping', amount: 3400, type: 'expense', category: 'Food & Dining' },
  { id: makeId(), date: format(subDays(today, 64), 'yyyy-MM-dd'), description: 'Goa Trip Flight', amount: 7500, type: 'expense', category: 'Travel' },
  { id: makeId(), date: format(subDays(today, 65), 'yyyy-MM-dd'), description: 'Home Rent', amount: 18000, type: 'expense', category: 'Housing' },
  { id: makeId(), date: format(subDays(today, 66), 'yyyy-MM-dd'), description: 'Hotel - Goa', amount: 8500, type: 'expense', category: 'Travel' },
  { id: makeId(), date: format(subDays(today, 67), 'yyyy-MM-dd'), description: 'Investment Dividend', amount: 3200, type: 'income', category: 'Investment' },
  { id: makeId(), date: format(subDays(today, 68), 'yyyy-MM-dd'), description: 'Laptop Accessories', amount: 5200, type: 'expense', category: 'Shopping' },
  { id: makeId(), date: format(subDays(today, 69), 'yyyy-MM-dd'), description: 'Electricity Bill', amount: 2100, type: 'expense', category: 'Utilities' },
  { id: makeId(), date: format(subDays(today, 70), 'yyyy-MM-dd'), description: 'Uber - Airport', amount: 900, type: 'expense', category: 'Transportation' },
  { id: makeId(), date: format(subDays(today, 71), 'yyyy-MM-dd'), description: 'OTT Bundle', amount: 999, type: 'expense', category: 'Entertainment' },
];

export const initialTransactions = generateTransactions();
