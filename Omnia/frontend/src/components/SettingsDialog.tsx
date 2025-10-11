import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { UserSettings } from '../types/supply';

interface SettingsDialogProps {
  open: boolean;
  currentSettings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onCancel: () => void;
}

const viewOptions = [
  'Select an option',
  'ECOM-TH-CFR-LOCD-STD',
  'ECOM-TH-DSS-NW-ALL',
  'ECOM-TH-DSS-NW-STD',
  'ECOM-TH-DSS-LOCD-EXP',
  'ECOM-TH-SSP-NW-STD',
  'MKP-TH-SSP-NW-STD',
  'MKP-TH-CFR-LOCD-STD',
  'ECOM-TH-SSP-NW-ALL',
  'MKP-TH-CFR-MANUAL-SYNC',
  'CMG-ECOM-TH-STD',
  'CMG-MKP-SHOPEE-TH-NTW-STD',
  'CMG-MKP-LAZADA-TH-LOC-STD',
  'CMG-MKP-MIRAKL-TH-NTW-STD',
];

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  currentSettings,
  onSave,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState<UserSettings>(currentSettings);

  useEffect(() => {
    if (open) {
      setSettings(currentSettings);
    }
  }, [open, currentSettings]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePageSizeChange = (event: any) => {
    setSettings((prev) => ({
      ...prev,
      defaultPageSize: event.target.value as 10 | 25 | 50 | 100,
    }));
  };

  const handleViewChange = (event: any) => {
    setSettings((prev) => ({
      ...prev,
      defaultView: event.target.value,
    }));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      language: event.target.value as 'thai' | 'english',
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  const handleCancel = () => {
    setSettings(currentSettings);
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      TransitionProps={{ timeout: 250 }}
      PaperProps={{
        sx: {
          borderRadius: '4px',
          padding: '24px',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
          marginBottom: '16px',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            color: '#212121',
          }}
        >
          User Settings
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '24px' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: '#1B3A57',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1B3A57',
            },
          }}
        >
          <Tab label="Preferences" />
          <Tab label="Profile" disabled sx={{ opacity: 0.5 }} />
        </Tabs>
      </Box>

      <DialogContent sx={{ padding: 0, marginBottom: '24px' }}>
        {activeTab === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Default Page Size</InputLabel>
              <Select
                value={settings.defaultPageSize}
                onChange={handlePageSizeChange}
                label="Default Page Size"
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1B3A57',
                    borderWidth: '2px',
                  },
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Default View</InputLabel>
              <Select
                value={settings.defaultView}
                onChange={handleViewChange}
                label="Default View"
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1B3A57',
                    borderWidth: '2px',
                  },
                }}
              >
                {viewOptions.map((option) => (
                  <MenuItem
                    key={option}
                    value={option === 'Select an option' ? '' : option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  color: '#616161',
                  fontSize: '14px',
                  marginBottom: '8px',
                  '&.Mui-focused': {
                    color: '#1B3A57',
                  },
                }}
              >
                Language
              </FormLabel>
              <RadioGroup
                value={settings.language}
                onChange={handleLanguageChange}
                aria-label="language"
              >
                <FormControlLabel
                  value="english"
                  control={
                    <Radio
                      sx={{
                        color: '#616161',
                        '&.Mui-checked': {
                          color: '#1B3A57',
                        },
                      }}
                    />
                  }
                  label="English"
                />
                <FormControlLabel
                  value="thai"
                  control={
                    <Radio
                      sx={{
                        color: '#616161',
                        '&.Mui-checked': {
                          color: '#1B3A57',
                        },
                      }}
                    />
                  }
                  label="Thai"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" disabled>
              <FormLabel
                component="legend"
                sx={{
                  color: '#9E9E9E',
                  fontSize: '14px',
                  marginBottom: '8px',
                }}
              >
                Theme (Coming Soon)
              </FormLabel>
              <RadioGroup value="system" aria-label="theme">
                <FormControlLabel
                  value="system"
                  control={<Radio />}
                  label="System"
                  disabled
                />
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label="Light"
                  disabled
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label="Dark"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: 0, justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            borderColor: '#616161',
            color: '#616161',
            '&:hover': {
              borderColor: '#212121',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: '#1B3A57',
            '&:hover': {
              backgroundColor: '#0D1F2F',
            },
          }}
        >
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
