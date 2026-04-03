import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "../utils/helpers";
import { CATEGORY_COLORS } from "../data/mockData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "divider",
        minWidth: 160,
      }}
    >
      <Typography variant="caption" fontWeight={700} display="block" mb={0.5}>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Box
          key={entry.name}
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Typography variant="caption" color={entry.color} fontWeight={600}>
            {entry.name}:
          </Typography>
          <Typography variant="caption">
            {formatCurrency(entry.value)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 1.5,
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="caption" fontWeight={700}>
        {payload[0].name}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
        color={payload[0].payload.fill}
      >
        {formatCurrency(payload[0].value)}
      </Typography>
    </Box>
  );
};

export function DailyTrendChart({ data }) {
  const theme = useTheme();
  if (!data?.length) return null;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <CardHeader
        title="Daily Activity"
        subheader="Daily cash flow (last 30 days)"
        titleTypographyProps={{ fontWeight: 700 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="dailyIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dailyExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f44336" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#4CAF50"
              fill="url(#dailyIncome)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f44336"
              fill="url(#dailyExpense)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function BalanceTrendChart({ data }) {
  const theme = useTheme();
  if (!data?.length) {
    return (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
          }}
        >
          <Typography color="text.secondary">
            No trend data available
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      <CardHeader
        title="Balance Trend"
        subheader="Monthly income vs expenses"
        titleTypographyProps={{ fontWeight: 700 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f44336" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#4CAF50"
              strokeWidth={2}
              fill="url(#incomeGrad)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f44336"
              strokeWidth={2}
              fill="url(#expenseGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function SpendingPieChart({ data }) {
  const theme = useTheme();
  if (!data?.length) {
    return (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 300,
          }}
        >
          <Typography color="text.secondary">
            No spending data available
          </Typography>
        </CardContent>
      </Card>
    );
  }
  const top6 = data.slice(0, 6);
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        height: "100%",
      }}
    >
      <CardHeader
        title="Spending Breakdown"
        subheader="By category (top 6)"
        titleTypographyProps={{ fontWeight: 700 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={top6}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {top6.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || "#999"}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              formatter={(value) => (
                <span style={{ fontSize: 12 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function CategoryBarChart({ data }) {
  const theme = useTheme();
  if (!data?.length) return null;
  const top5 = data.slice(0, 5);
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
      <CardHeader
        title="Top Expense Categories"
        subheader="Highest spending areas"
        titleTypographyProps={{ fontWeight: 700 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={top5} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis
              type="number"
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Amount" radius={[0, 6, 6, 0]}>
              {top5.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] || "#999"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
