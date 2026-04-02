import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, MenuItem, Select,
  IconButton, Tooltip, Avatar, Chip, FormControl, InputLabel, Badge
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { state, dispatch } = useApp();
  const { role, darkMode } = state;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: darkMode ? '#1a1a2e' : 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar sx={{ gap: 2, px: { xs: 2, sm: 3 } }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, borderRadius: 2 }}>
            <AccountBalanceIcon sx={{ fontSize: 20 }} />
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="subtitle1" fontWeight={800} lineHeight={1.1}>
              FinanceDash
            </Typography>

          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Switch role to simulate RBAC">
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <Select
                value={role}
                onChange={(e) => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
                displayEmpty
                renderValue={(v) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    {v === 'admin' ? <AdminPanelSettingsIcon sx={{ fontSize: 16, color: 'primary.main' }} /> : <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                    <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>{v}</Typography>
                  </Box>
                )}
                sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
              >
                <MenuItem value="admin">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AdminPanelSettingsIcon fontSize="small" color="primary" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>Admin</Typography>
                      <Typography variant="caption" color="text.secondary">Can add, edit, delete</Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem value="viewer">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VisibilityIcon fontSize="small" />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>Viewer</Typography>
                      <Typography variant="caption" color="text.secondary">Read-only access</Typography>
                    </Box>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Tooltip>

          <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              size="small"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, width: 36, height: 36 }}
            >
              {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
