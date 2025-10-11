import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Collapse,
  InputAdornment,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { FilterState } from '../types/supply';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
  initialFilters?: Partial<FilterState>;
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

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  onClear,
  initialFilters = {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    locationId: '',
    itemId: '',
    supplyTypeId: '',
    view: '',
    includeErrored: '',
    displayPendingReview: 'yes-and-no',
    segment: '',
    referenceType: '',
    referenceId: '',
    batchNumber: '',
    countryOfOrigin: '',
    inventoryType: '',
    productStatus: '',
    ...initialFilters,
  });

  const hasFilters = Object.values(filters).some((value) => value !== '' && value !== 'yes-and-no');

  const handleTextChange = (field: keyof FilterState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof FilterState) => (
    event: SelectChangeEvent<string>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      locationId: '',
      itemId: '',
      supplyTypeId: '',
      view: '',
      includeErrored: '',
      displayPendingReview: 'yes-and-no',
      segment: '',
      referenceType: '',
      referenceId: '',
      batchNumber: '',
      countryOfOrigin: '',
      inventoryType: '',
      productStatus: '',
    };
    setFilters(clearedFilters);
    onClear();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && hasFilters) {
      handleApply();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#F5F5F5',
        padding: '24px',
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          fontWeight: 500,
          color: '#616161',
          marginBottom: '16px',
        }}
      >
        FILTER PANEL
      </Typography>

      {/* Basic Filters */}
      <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Location ID"
            variant="outlined"
            value={filters.locationId}
            onChange={handleTextChange('locationId')}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Item ID"
            variant="outlined"
            value={filters.itemId}
            onChange={handleTextChange('itemId')}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Supply Type ID"
            variant="outlined"
            value={filters.supplyTypeId}
            onChange={handleTextChange('supplyTypeId')}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>View</InputLabel>
            <Select
              value={filters.view}
              onChange={handleSelectChange('view')}
              label="View"
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              }}
            >
              {viewOptions.map((option) => (
                <MenuItem key={option} value={option === 'Select an option' ? '' : option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Include Errored Supply?</InputLabel>
            <Select
              value={filters.includeErrored}
              onChange={handleSelectChange('includeErrored')}
              label="Include Errored Supply?"
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              }}
            >
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Display Pending Review?</InputLabel>
            <Select
              value={filters.displayPendingReview}
              onChange={handleSelectChange('displayPendingReview')}
              label="Display Pending Review?"
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1B3A57',
                  borderWidth: '2px',
                },
              }}
            >
              <MenuItem value="yes-and-no">Yes & No</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Advanced Filters (Collapsible) */}
      <Collapse in={expanded} timeout={300}>
        <Grid container spacing={2} sx={{ marginBottom: '16px' }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Segment"
              variant="outlined"
              value={filters.segment}
              onChange={handleTextChange('segment')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Reference Type"
              variant="outlined"
              value={filters.referenceType}
              onChange={handleTextChange('referenceType')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Reference ID"
              variant="outlined"
              value={filters.referenceId}
              onChange={handleTextChange('referenceId')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Batch Number"
              variant="outlined"
              value={filters.batchNumber}
              onChange={handleTextChange('batchNumber')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country of Origin"
              variant="outlined"
              value={filters.countryOfOrigin}
              onChange={handleTextChange('countryOfOrigin')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Inventory Type"
              variant="outlined"
              value={filters.inventoryType}
              onChange={handleTextChange('inventoryType')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Status"
              variant="outlined"
              value={filters.productStatus}
              onChange={handleTextChange('productStatus')}
              onKeyPress={handleKeyPress}
            />
          </Grid>
        </Grid>
      </Collapse>

      {/* Control Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          variant="text"
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{
            color: '#1B3A57',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        >
          {expanded ? 'LESS' : 'MORE'}
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClear}
            sx={{
              borderColor: '#1B3A57',
              color: '#1B3A57',
              '&:hover': {
                borderColor: '#0D1F2F',
                backgroundColor: 'rgba(27, 58, 87, 0.04)',
              },
            }}
          >
            CLEAR
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            disabled={!hasFilters}
            sx={{
              backgroundColor: '#1B3A57',
              '&:hover': {
                backgroundColor: '#0D1F2F',
              },
              '&:disabled': {
                backgroundColor: '#E0E0E0',
                color: '#9E9E9E',
              },
            }}
          >
            APPLY
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterPanel;
