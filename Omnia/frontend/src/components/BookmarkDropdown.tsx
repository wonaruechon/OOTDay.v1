import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Box,
  Divider,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Bookmark, FilterState } from '../types/supply';
import ConfirmationDialog from './ConfirmationDialog';
import BookmarkSaveDialog from './BookmarkSaveDialog';

interface BookmarkDropdownProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  bookmarks: Bookmark[];
  currentFilters: FilterState;
  onClose: () => void;
  onBookmarkClick: (bookmark: Bookmark) => void;
  onBookmarkDelete: (bookmarkId: string) => void;
  onBookmarkSave: (name: string, filters: FilterState) => void;
}

const BookmarkDropdown: React.FC<BookmarkDropdownProps> = ({
  open,
  anchorEl,
  bookmarks,
  currentFilters,
  onClose,
  onBookmarkClick,
  onBookmarkDelete,
  onBookmarkSave,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);

  const handleBookmarkClick = (bookmark: Bookmark) => {
    onBookmarkClick(bookmark);
    onClose();
  };

  const handleDeleteClick = (bookmark: Bookmark, event: React.MouseEvent) => {
    event.stopPropagation();
    setBookmarkToDelete(bookmark);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (bookmarkToDelete) {
      onBookmarkDelete(bookmarkToDelete.id);
      setDeleteDialogOpen(false);
      setBookmarkToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setBookmarkToDelete(null);
  };

  const handleSaveClick = () => {
    const userBookmarks = bookmarks.filter((b) => !b.isDefault);
    if (userBookmarks.length >= 10) {
      alert('Maximum 10 bookmarks reached. Delete one to add a new bookmark.');
      return;
    }
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = (name: string) => {
    onBookmarkSave(name, currentFilters);
    setSaveDialogOpen(false);
    onClose();
  };

  const handleSaveCancel = () => {
    setSaveDialogOpen(false);
  };

  // Sort bookmarks: default first, then user bookmarks by created date desc
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        TransitionProps={{ timeout: 200 }}
        PaperProps={{
          sx: {
            width: '320px',
            maxHeight: '400px',
            borderRadius: '4px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
            padding: '16px',
            '@media (max-width: 768px)': {
              width: '100vw',
              borderRadius: 0,
            },
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            color: '#212121',
            marginBottom: '12px',
            paddingLeft: '8px',
          }}
        >
          Bookmarks
        </Typography>

        {sortedBookmarks.length === 0 ? (
          <Box
            sx={{
              padding: '24px 8px',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: '14px',
                color: '#616161',
                marginBottom: '8px',
              }}
            >
              No saved bookmarks
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '12px',
                color: '#9E9E9E',
              }}
            >
              Click 'Save Current View' to create your first bookmark
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '12px' }}>
            {sortedBookmarks.map((bookmark) => (
              <MenuItem
                key={bookmark.id}
                onClick={() => handleBookmarkClick(bookmark)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '14px',
                    color: '#212121',
                    flex: 1,
                  }}
                >
                  {bookmark.name}
                </Typography>
                {bookmark.isDefault ? (
                  <LockIcon
                    sx={{
                      fontSize: '18px',
                      color: '#9E9E9E',
                    }}
                  />
                ) : (
                  <IconButton
                    size="small"
                    onClick={(e) => handleDeleteClick(bookmark, e)}
                    aria-label="Delete bookmark"
                    sx={{
                      padding: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.08)',
                      },
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: '18px',
                        color: '#D32F2F',
                      }}
                    />
                  </IconButton>
                )}
              </MenuItem>
            ))}
          </Box>
        )}

        <Divider sx={{ margin: '8px 0' }} />

        <Button
          variant="outlined"
          fullWidth
          startIcon={<BookmarkAddIcon />}
          onClick={handleSaveClick}
          sx={{
            textTransform: 'none',
            borderColor: '#1B3A57',
            color: '#1B3A57',
            '&:hover': {
              borderColor: '#0D1F2F',
              backgroundColor: 'rgba(27, 58, 87, 0.04)',
            },
          }}
        >
          Save Current View
        </Button>
      </Menu>

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Bookmark?"
        message={`Are you sure you want to delete "${bookmarkToDelete?.name}"? This action cannot be undone.`}
        confirmButtonText="Delete"
        confirmButtonColor="error"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <BookmarkSaveDialog
        open={saveDialogOpen}
        onSave={handleSaveConfirm}
        onCancel={handleSaveCancel}
      />
    </>
  );
};

export default BookmarkDropdown;
