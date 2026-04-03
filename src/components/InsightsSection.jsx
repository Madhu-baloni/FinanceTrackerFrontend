import { Box, Card, CardContent, CardHeader, Typography, LinearProgress, Avatar, Alert, Chip, Dialog, DialogContent, IconButton, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CATEGORY_COLORS } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import { useState } from 'react';

function InsightCard({ title, icon, color, children, onClick, isExpanded }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        boxShadow: isExpanded ? 'none' : '0 4px 20px rgba(0,0,0,0.06)',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 28px ${color}15`,
          borderColor: color,
        } : {},
        border: '1px solid transparent'
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: `${color}20`, color, borderRadius: 2, width: 40, height: 40 }}>{icon}</Avatar>}
        title={title}
        titleTypographyProps={{ fontWeight: 700, variant: isExpanded ? 'h5' : 'subtitle1' }}
        action={isExpanded && onClick && (
          <IconButton onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <CloseIcon />
          </IconButton>
        )}
      />
      <CardContent sx={{ pt: 0 }}>{children}</CardContent>
    </Card>
  );
}

export default function InsightsSection({ insights, summary }) {
  const [activeInsight, setActiveInsight] = useState(null);

  if (!insights) return null;
  const { highestCategory, monthComparison, avgExpense, largestExpense, byCategory } = insights;
  const savingsRate = summary.income > 0 ? ((summary.income - summary.expenses) / summary.income) * 100 : 0;

  const renderHighestSpendingContent = (isExpanded) => (
    highestCategory ? (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: CATEGORY_COLORS[highestCategory.name] || '#999', flexShrink: 0 }} />
          <Typography variant={isExpanded ? "h5" : "h6"} fontWeight={700}>{highestCategory.name}</Typography>
        </Box>
        <Typography variant={isExpanded ? "h3" : "h5"} fontWeight={800} color="error.main">{formatCurrency(highestCategory.value)}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: isExpanded ? '0.9rem' : 'inherit' }}>
          {summary.expenses > 0 ? `${((highestCategory.value / summary.expenses) * 100).toFixed(1)}% of total expenses` : ''}
        </Typography>
        <Box sx={{ mt: 2 }}>
          {byCategory.slice(0, isExpanded ? 8 : 4).map((cat) => (
            <Box key={cat.name} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant={isExpanded ? "body1" : "caption"}>{cat.name}</Typography>
                <Typography variant={isExpanded ? "body1" : "caption"} fontWeight={600}>{formatCurrency(cat.value)}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={summary.expenses > 0 ? (cat.value / summary.expenses) * 100 : 0}
                sx={{ height: isExpanded ? 8 : 5, borderRadius: 3, bgcolor: `${CATEGORY_COLORS[cat.name]}30`, '& .MuiLinearProgress-bar': { bgcolor: CATEGORY_COLORS[cat.name] || '#999', borderRadius: 3 } }}
              />
            </Box>
          ))}
        </Box>
      </>
    ) : (
      <Typography color="text.secondary">No expense data available</Typography>
    )
  );

  const renderMonthlyComparisonContent = (isExpanded) => (
    monthComparison ? (
      <>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={monthComparison.diff < 0 ? <TrendingDownIcon /> : <TrendingUpIcon />}
            label={`${Math.abs(monthComparison.pct)}% ${monthComparison.diff < 0 ? 'less' : 'more'} spending`}
            color={monthComparison.diff < 0 ? 'success' : 'error'}
            size={isExpanded ? "medium" : "small"}
          />
        </Box>
        {[monthComparison.previous, monthComparison.current].map((m, i) => (
          <Box key={m.month} sx={{ mb: 2, p: isExpanded ? 2.5 : 1.5, borderRadius: 2, bgcolor: i === 1 ? 'action.hover' : 'transparent', border: i === 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
            <Typography variant={isExpanded ? "body1" : "caption"} color="text.secondary" fontWeight={600}>{m.month} {i === 1 ? '(current)' : '(previous)'}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Box>
                <Typography variant={isExpanded ? "h6" : "caption"} color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>↑ {formatCurrency(m.income)}</Typography>
              </Box>
              <Box>
                <Typography variant={isExpanded ? "h6" : "caption"} color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>↓ {formatCurrency(m.expenses)}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </>
    ) : (
      <Typography color="text.secondary">Need at least 2 months of data</Typography>
    )
  );

  const renderHealthScoreContent = (isExpanded) => (
    <>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant={isExpanded ? "h6" : "body2"}>Savings Rate</Typography>
          <Typography variant={isExpanded ? "h5" : "body2"} fontWeight={700} color={savingsRate >= 20 ? 'success.main' : savingsRate >= 10 ? 'warning.main' : 'error.main'}>
            {savingsRate.toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(savingsRate, 100)}
          sx={{ height: isExpanded ? 12 : 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: savingsRate >= 20 ? '#4CAF50' : savingsRate >= 10 ? '#FF9800' : '#f44336', borderRadius: 4 } }}
        />
      </Box>

      {largestExpense && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2, '& .MuiAlert-message': { fontSize: isExpanded ? 14 : 12 } }}>
          Largest single expense: <strong>{formatCurrency(largestExpense.amount)}</strong> on {largestExpense.description}
        </Alert>
      )}

      {avgExpense > 0 && (
        <Box sx={{ p: isExpanded ? 2.5 : 1.5, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: isExpanded ? '0.9rem' : 'inherit' }}>Avg transaction amount</Typography>
          <Typography variant={isExpanded ? "h5" : "h6"} fontWeight={700}>{formatCurrency(Math.round(avgExpense))}</Typography>
        </Box>
      )}

      <Box sx={{ mt: 1.5 }}>
        {savingsRate >= 20 ? (
          <Alert severity="success" sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: isExpanded ? 14 : 12 } }}>Great savings rate! Keep it up.</Alert>
        ) : savingsRate >= 10 ? (
          <Alert severity="warning" sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: isExpanded ? 14 : 12 } }}>Aim for 20%+ savings rate.</Alert>
        ) : (
          <Alert severity="error" sx={{ borderRadius: 2, '& .MuiAlert-message': { fontSize: isExpanded ? 14 : 12 } }}>Low savings rate. Review your expenses.</Alert>
        )}
      </Box>
    </>
  );

  const insightData = [
    { title: "Highest Spending Category", icon: <EmojiEventsIcon />, color: "#FF6B6B", render: renderHighestSpendingContent },
    { title: "Monthly Comparison", icon: <InsightsIcon />, color: "#2196F3", render: renderMonthlyComparisonContent },
    { title: "Financial Health", icon: <CheckCircleIcon />, color: "#4CAF50", render: renderHealthScoreContent },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>Insights</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
        {insightData.map((insight, index) => (
          <InsightCard
            key={insight.title}
            title={insight.title}
            icon={insight.icon}
            color={insight.color}
            onClick={() => setActiveInsight(index)}
          >
            {insight.render(false)}
          </InsightCard>
        ))}
      </Box>

      <Dialog
        open={activeInsight !== null}
        onClose={() => setActiveInsight(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        PaperProps={{
          sx: { borderRadius: 4, backgroundImage: 'none' }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {activeInsight !== null && (
            <InsightCard
              title={insightData[activeInsight].title}
              icon={insightData[activeInsight].icon}
              color={insightData[activeInsight].color}
              isExpanded={true}
              onClick={() => setActiveInsight(null)}
            >
              <Box sx={{ mt: 1 }}>
                {insightData[activeInsight].render(true)}
              </Box>
            </InsightCard>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
