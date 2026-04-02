import { subDays, parseISO, isAfter, format, startOfMonth, getMonth, getYear } from 'date-fns';

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateStr) =>
  format(parseISO(dateStr), 'dd MMM yyyy');

export const filterTransactions = (transactions, filters) => {
  const cutoff = subDays(new Date(), parseInt(filters.dateRange) || 90);

  return transactions.filter((t) => {
    const tDate = parseISO(t.date);

    if (!isAfter(tDate, cutoff)) return false;

    if (filters.type !== 'all' && t.type !== filters.type) return false;

    if (filters.category !== 'all' && t.category !== filters.category) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !t.description.toLowerCase().includes(q) &&
        !t.category.toLowerCase().includes(q) &&
        !String(t.amount).includes(q)
      )
        return false;
    }

    return true;
  });
};

export const sortTransactions = (transactions, sort) => {
  return [...transactions].sort((a, b) => {
    let aVal = a[sort.field];
    let bVal = b[sort.field];
    if (sort.field === 'date') {
      aVal = parseISO(a.date).getTime();
      bVal = parseISO(b.date).getTime();
    }
    if (sort.field === 'amount') {
      aVal = Number(a.amount);
      bVal = Number(b.amount);
    }
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const computeSummary = (transactions) => {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

export const getSpendingByCategory = (transactions) => {
  const map = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyTrend = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const d = parseISO(t.date);
    const key = format(d, 'MMM yyyy');
    if (!map[key]) map[key] = { month: key, income: 0, expenses: 0, balance: 0, order: d.getTime() };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expenses += t.amount;
    map[key].balance = map[key].income - map[key].expenses;
  });
  return Object.values(map).sort((a, b) => a.order - b.order);
};

export const getInsights = (transactions) => {
  const byCategory = getSpendingByCategory(transactions);
  const monthly = getMonthlyTrend(transactions);

  const highestCategory = byCategory[0] || null;

  const lastTwo = monthly.slice(-2);
  let monthComparison = null;
  if (lastTwo.length === 2) {
    const diff = lastTwo[1].expenses - lastTwo[0].expenses;
    const pct = lastTwo[0].expenses ? ((diff / lastTwo[0].expenses) * 100).toFixed(1) : 0;
    monthComparison = {
      current: lastTwo[1],
      previous: lastTwo[0],
      diff,
      pct,
    };
  }

  const avgExpense = transactions.filter((t) => t.type === 'expense').length
    ? transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0) /
      transactions.filter((t) => t.type === 'expense').length
    : 0;

  const largestExpense = [...transactions]
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0] || null;

  return { highestCategory, monthComparison, avgExpense, largestExpense, byCategory };
};

export const exportToCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions) => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);
