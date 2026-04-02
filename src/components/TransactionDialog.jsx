import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Box, ToggleButton,
  ToggleButtonGroup, Typography, Divider
} from '@mui/material';
import { CATEGORIES } from '../data/mockData';
import { generateId } from '../utils/helpers';
import { format } from 'date-fns';

const defaultForm = {
  description: '',
  amount: '',
  category: 'Food & Dining',
  type: 'expense',
  date: format(new Date(), 'yyyy-MM-dd'),
};

export default function TransactionDialog({ open, onClose, onSave, transaction }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setForm({ ...transaction, amount: String(transaction.amount) });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [transaction, open]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid positive amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const saved = {
      ...form,
      id: transaction?.id || generateId(),
      amount: Number(form.amount),
    };
    onSave(saved);
    onClose();
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        {transaction ? 'Edit Transaction' : 'Add New Transaction'}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} mb={0.5} display="block">
              Transaction Type
            </Typography>
            <ToggleButtonGroup
              value={form.type}
              exclusive
              onChange={(_, v) => v && setForm((f) => ({ ...f, type: v }))}
              size="small"
              fullWidth
            >
              <ToggleButton value="income" sx={{ flex: 1, '&.Mui-selected': { bgcolor: '#4CAF5020', color: '#4CAF50', borderColor: '#4CAF50' } }}>
                Income
              </ToggleButton>
              <ToggleButton value="expense" sx={{ flex: 1, '&.Mui-selected': { bgcolor: '#f4433620', color: '#f44336', borderColor: '#f44336' } }}>
                Expense
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            label="Description"
            value={form.description}
            onChange={set('description')}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            size="small"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Amount (₹)"
              value={form.amount}
              onChange={set('amount')}
              error={!!errors.amount}
              helperText={errors.amount}
              type="number"
              inputProps={{ min: 0 }}
              sx={{ flex: 1 }}
              size="small"
            />
            <TextField
              label="Date"
              value={form.date}
              onChange={set('date')}
              error={!!errors.date}
              helperText={errors.date}
              type="date"
              sx={{ flex: 1 }}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <TextField
            label="Category"
            value={form.category}
            onChange={set('category')}
            select
            fullWidth
            size="small"
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" sx={{ borderRadius: 2, px: 3 }}>
          {transaction ? 'Update' : 'Add Transaction'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
