import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmButtonText?: string;
  confirmButtonColor?: 'primary' | 'error';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  confirmButtonText = 'Confirm',
  confirmButtonColor = 'primary',
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
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
          {title}
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
      <DialogContent sx={{ padding: 0, marginBottom: '24px' }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '14px',
            color: '#616161',
            lineHeight: 1.5,
          }}
        >
          {message}
        </Typography>
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
          color={confirmButtonColor}
          onClick={handleConfirm}
          autoFocus
          sx={{
            ...(confirmButtonColor === 'primary' && {
              backgroundColor: '#1B3A57',
              '&:hover': {
                backgroundColor: '#0D1F2F',
              },
            }),
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
