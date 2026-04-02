import React, { useMemo } from 'react';
import { Box, Typography, Alert, Chip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SummaryCards from './SummaryCards';
import { BalanceTrendChart, SpendingPieChart, CategoryBarChart } from './Charts';
import InsightsSection from './InsightsSection';
import TransactionsSection from './TransactionsSection';
import { computeSummary, getSpendingByCategory, getMonthlyTrend, getInsights, filterTransactions } from '../utils/helpers';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { state } = useApp();
  const { transactions, filters, role } = state;

  const filtered = useMemo(() => filterTransactions(transactions, filters), [transactions, filters]);
  const summary = useMemo(() => computeSummary(filtered), [filtered]);
  const byCategory = useMemo(() => getSpendingByCategory(filtered), [filtered]);
  const monthlyTrend = useMemo(() => getMonthlyTrend(filtered), [filtered]);
  const insights = useMemo(() => getInsights(filtered), [filtered]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Role banner */}
      <Alert
        severity={role === 'admin' ? 'info' : 'warning'}
        icon={role === 'admin' ? <AdminPanelSettingsIcon /> : <VisibilityIcon />}
        sx={{ mb: 3, borderRadius: 2 }}
        action={
          <Chip
            label={role === 'admin' ? 'Full Access' : 'Read Only'}
            size="small"
            color={role === 'admin' ? 'primary' : 'default'}
          />
        }
      >
        <strong>{role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}</strong>
        {role === 'admin'
          ? ' — You can add, edit, and delete transactions.'
          : ' — You have read-only access. Switch to Admin to make changes.'}
      </Alert>

      {/* Page title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>Dashboard Overview</Typography>
        <Typography variant="body2" color="text.secondary">Track your income, expenses & financial health</Typography>
      </Box>

      {/* Summary cards */}
      <Box sx={{ mb: 3 }}>
        <SummaryCards summary={summary} />
      </Box>

      {/* Charts row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
        <BalanceTrendChart data={monthlyTrend} />
        <SpendingPieChart data={byCategory} />
      </Box>

      {/* Category bar */}
      {byCategory.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <CategoryBarChart data={byCategory} />
        </Box>
      )}

      {/* Insights */}
      <Box sx={{ mb: 3 }}>
        <InsightsSection insights={insights} summary={summary} />
      </Box>

      {/* Transactions */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2}>Transactions</Typography>
        <TransactionsSection />
      </Box>
    </Box>
  );
}
