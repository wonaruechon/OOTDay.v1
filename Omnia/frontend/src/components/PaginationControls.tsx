import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography, Button } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationControlsProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  selectedRowCount: number;
  onPageChange: (page: number) => void;
  onResetError: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalCount,
  pageSize,
  selectedRowCount,
  onPageChange,
  onResetError,
}) => {
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const totalPages = Math.ceil(totalCount / pageSize);
  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(event.target.value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInput, 10);
    if (isNaN(pageNum) || pageNum < 1) {
      setPageInput(currentPage.toString());
    } else if (pageNum > totalPages) {
      setPageInput(totalPages.toString());
      onPageChange(totalPages);
    } else if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  const handlePageInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handlePageInputBlur();
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        padding: '0 12px',
        borderTop: '1px solid #E0E0E0',
        backgroundColor: '#FFFFFF',
        flexWrap: 'wrap',
        gap: 2,
        '@media (max-width: 768px)': {
          height: 'auto',
          padding: '8px 12px',
        },
      }}
    >
      {/* Left section - Navigation controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          disabled={currentPage === 1}
          onClick={handleFirstPage}
          aria-label="First page"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          aria-label="Previous page"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="body2" sx={{ color: '#616161' }}>
          Page
        </Typography>
        <TextField
          value={pageInput}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlur}
          onKeyPress={handlePageInputKeyPress}
          variant="outlined"
          size="small"
          inputProps={{
            'aria-label': 'Jump to page',
            style: { textAlign: 'center' },
          }}
          sx={{
            width: '60px',
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
              {
                WebkitAppearance: 'none',
                margin: 0,
              },
          }}
        />
        <Typography variant="body2" sx={{ color: '#616161' }}>
          of {totalPages}
        </Typography>
        <IconButton
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          aria-label="Next page"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          disabled={currentPage === totalPages}
          onClick={handleLastPage}
          aria-label="Last page"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          <LastPageIcon />
        </IconButton>
      </Box>

      {/* Right section - Record counter and Reset Error button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: '#616161' }}
          aria-live="polite"
        >
          Displaying {startRecord} - {endRecord} of {totalCount}
        </Typography>
        <Button
          variant="contained"
          color="error"
          disabled={selectedRowCount === 0}
          onClick={onResetError}
          sx={{
            '&:disabled': {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          }}
        >
          RESET ERROR {selectedRowCount > 0 && `(${selectedRowCount})`}
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationControls;
