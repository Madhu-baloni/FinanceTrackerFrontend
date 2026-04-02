import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, IconButton, Button, InputAdornment, Tooltip, TableSortLabel,
  Menu, ListItemIcon, ListItemText, Divider, TablePagination, Stack,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData';
import { formatCurrency, formatDate, filterTransactions, sortTransactions, exportToCSV, exportToJSON } from '../utils/helpers';
import { useApp } from '../context/AppContext';
import TransactionDialog from './TransactionDialog';

const DATE_RANGES = [
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 60 days', value: '60' },
  { label: 'Last 90 days', value: '90' },
  { label: 'Last 6 months', value: '180' },
  { label: 'All time', value: '3650' },
];

export default function TransactionsSection() {
  const { state, dispatch } = useApp();
  const { transactions, filters, sort, role } = state;
  const isAdmin = role === 'admin';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [exportMenu, setExportMenu] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const setFilter = (key, value) => {
    dispatch({ type: 'SET_FILTER', key, value });
    setPage(0);
  };

  const handleSort = (field) => {
    const dir = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    dispatch({ type: 'SET_SORT', payload: { field, direction: dir } });
  };

  const filtered = useMemo(() => filterTransactions(transactions, filters), [transactions, filters]);
  const sorted = useMemo(() => sortTransactions(filtered, sort), [filtered, sort]);
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleAdd = () => { setEditTx(null); setDialogOpen(true); };
  const handleEdit = (tx) => { setEditTx(tx); setDialogOpen(true); };
  const handleDelete = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });

  const handleSave = (tx) => {
    if (editTx) dispatch({ type: 'EDIT_TRANSACTION', payload: tx });
    else dispatch({ type: 'ADD_TRANSACTION', payload: tx });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
    setPage(0);
  };

  return (
    <Box>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>Transactions</Typography>
              <Typography variant="caption" color="text.secondary">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Export">
                <IconButton onClick={(e) => setExportMenu(e.currentTarget)} size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {isAdmin && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} size="small" sx={{ borderRadius: 2 }}>
                  Add Transaction
                </Button>
              )}
            </Stack>
          </Box>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <TextField
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
              size="small"
              sx={{ flex: '1 1 200px' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
            <TextField select value={filters.type} onChange={(e) => setFilter('type', e.target.value)} size="small" label="Type" sx={{ minWidth: 130 }}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
            <TextField select value={filters.category} onChange={(e) => setFilter('category', e.target.value)} size="small" label="Category" sx={{ minWidth: 160 }}>
              <MenuItem value="all">All Categories</MenuItem>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField select value={filters.dateRange} onChange={(e) => setFilter('dateRange', e.target.value)} size="small" label="Date Range" sx={{ minWidth: 150 }}>
              {DATE_RANGES.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
            </TextField>
            <Tooltip title="Reset filters">
              <IconButton onClick={resetFilters} size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Table */}
          {paginated.length === 0 ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>No transactions match your filters. Try adjusting the search or filter criteria.</Alert>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      { id: 'date', label: 'Date' },
                      { id: 'description', label: 'Description' },
                      { id: 'category', label: 'Category' },
                      { id: 'type', label: 'Type' },
                      { id: 'amount', label: 'Amount' },
                    ].map((col) => (
                      <TableCell key={col.id} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                        <TableSortLabel
                          active={sort.field === col.id}
                          direction={sort.field === col.id ? sort.direction : 'asc'}
                          onClick={() => handleSort(col.id)}
                        >
                          {col.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    {isAdmin && <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginated.map((tx) => (
                    <TableRow key={tx.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary', fontSize: 13 }}>{formatDate(tx.date)}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 200 }}>{tx.description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={tx.category}
                          size="small"
                          sx={{ bgcolor: `${CATEGORY_COLORS[tx.category] || '#999'}22`, color: CATEGORY_COLORS[tx.category] || '#999', fontWeight: 600, fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                          size="small"
                          sx={{ bgcolor: tx.type === 'income' ? '#4CAF5020' : '#f4433620', color: tx.type === 'income' ? '#4CAF50' : '#f44336', fontWeight: 600, fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, color: tx.type === 'income' ? '#4CAF50' : '#f44336', whiteSpace: 'nowrap' }}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </TableCell>
                      {isAdmin && (
                        <TableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEdit(tx)} sx={{ mr: 0.5 }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDelete(tx.id)} color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            component="div"
            count={sorted.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      {/* Export Menu */}
      <Menu anchorEl={exportMenu} open={Boolean(exportMenu)} onClose={() => setExportMenu(null)} PaperProps={{ sx: { borderRadius: 2 } }}>
        <ListItemText sx={{ px: 2, py: 0.5 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>EXPORT</Typography>
        </ListItemText>
        <Divider />
        <MenuItem onClick={() => { exportToCSV(sorted); setExportMenu(null); }}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { exportToJSON(sorted); setExportMenu(null); }}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Export as JSON</ListItemText>
        </MenuItem>
      </Menu>

      <TransactionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        transaction={editTx}
      />
    </Box>
  );
}
