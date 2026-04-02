import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SavingsIcon from '@mui/icons-material/Savings';
import { formatCurrency } from '../utils/helpers';

const StatCard = ({ title, value, icon, color, subtitle, displayValue }) => (
  <Card
    sx={{
      flex: 1,
      minWidth: 200,
      borderRadius: 3,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '2px solid transparent',
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: `0 16px 32px ${color}33, 0 8px 16px rgba(0,0,0,0.06)`,
        borderColor: color,
        '& .stat-avatar': {
          transform: 'scale(1.15) rotate(8deg)',
        }
      }
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>{title}</Typography>
          <Typography variant="h4" fontWeight={700} color={color} sx={{ letterSpacing: '-0.5px' }}>{displayValue || formatCurrency(value)}</Typography>
        </Box>
        <Avatar
          className="stat-avatar"
          sx={{
            bgcolor: `${color}22`,
            color: color,
            width: 52,
            height: 52,
            borderRadius: 2,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {icon}
        </Avatar>
      </Box>
      {subtitle && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>{subtitle}</Typography>}
    </CardContent>
  </Card>
);

export default function SummaryCards({ summary }) {
  const savingsRate = summary.income > 0 ? Math.max(0, Math.round(((summary.income - summary.expenses) / summary.income) * 100)) : 0;
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <StatCard title="Total Balance" value={summary.balance} icon={<AccountBalanceWalletIcon />} color={summary.balance >= 0 ? '#2196F3' : '#f44336'} subtitle="Income minus expenses" />
      <StatCard title="Total Income" value={summary.income} icon={<TrendingUpIcon />} color="#4CAF50" subtitle="All income transactions" />
      <StatCard title="Total Expenses" value={summary.expenses} icon={<TrendingDownIcon />} color="#f44336" subtitle="All expense transactions" />
      <StatCard title="Savings Rate" value={savingsRate} displayValue={`${savingsRate}%`} icon={<SavingsIcon />} color="#9C27B0" subtitle="Percentage of income saved" />
    </Box>
  );
}
