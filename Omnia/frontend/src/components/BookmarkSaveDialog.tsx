import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BookmarkSaveDialogProps {
  open: boolean;
  onSave: (name: string) => void;
  onCancel: () => void;
}

const BookmarkSaveDialog: React.FC<BookmarkSaveDialogProps> = ({
  open,
  onSave,
  onCancel,
}) => {
  const [bookmarkName, setBookmarkName] = useState('');

  const handleSave = () => {
    if (bookmarkName.trim()) {
      onSave(bookmarkName.trim());
      setBookmarkName('');
    }
  };

  const handleCancel = () => {
    setBookmarkName('');
    onCancel();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && bookmarkName.trim()) {
      handleSave();
    }
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
          Save Bookmark
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
          variant="body2"
          sx={{
            fontSize: '14px',
            color: '#616161',
            marginBottom: '16px',
          }}
        >
          Enter a name for your bookmark to save the current filter settings.
        </Typography>
        <TextField
          fullWidth
          label="Bookmark Name"
          variant="outlined"
          value={bookmarkName}
          onChange={(e) => setBookmarkName(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          placeholder="e.g., My Favorite Filters"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#1B3A57',
                borderWidth: '2px',
              },
            },
          }}
        />
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
          disabled={!bookmarkName.trim()}
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
          Save Bookmark
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookmarkSaveDialog;
