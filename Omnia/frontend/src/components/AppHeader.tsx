import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckIcon from '@mui/icons-material/Check';

interface AppHeaderProps {
  organizationName?: string;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onBookmarksClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  organizationName = 'CRC',
  onSettingsClick,
  onHelpClick,
  onBookmarksClick,
}) => {
  const [orgAnchorEl, setOrgAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const handleOrgClick = (event: React.MouseEvent<HTMLElement>) => {
    setOrgAnchorEl(event.currentTarget);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOrgAnchorEl(null);
    setProfileAnchorEl(null);
    setUserAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handleClose();
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      console.log('Settings clicked');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1B3A57',
        color: '#FFFFFF',
        height: '64px',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '64px !important',
          paddingLeft: '0 !important',
          paddingRight: '16px !important',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Left section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Menu">
            <IconButton
              color="inherit"
              aria-label="Open menu"
              onClick={() => console.log('Menu clicked')}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:focus': {
                  outline: '2px solid #FFFFFF',
                  outlineOffset: '2px',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginLeft: '24px',
            }}
          >
            OMNI ENTERPRISE
          </Typography>
        </Box>

        {/* Right section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Bookmarks */}
          <Tooltip title="Bookmarks">
            <IconButton
              color="inherit"
              aria-label="Open bookmarks menu"
              onClick={onBookmarksClick || ((e) => console.log('Bookmarks clicked', e))}
              sx={{
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <BookmarkBorderIcon />
            </IconButton>
          </Tooltip>

          {/* Organization selector */}
          <Tooltip title="Select Organization">
            <IconButton
              color="inherit"
              aria-label="Select organization"
              onClick={handleOrgClick}
              sx={{
                display: 'flex',
                gap: 0.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <Typography variant="body2">{organizationName}</Typography>
              <ExpandMoreIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={orgAnchorEl}
            open={Boolean(orgAnchorEl)}
            onClose={handleClose}
            TransitionProps={{ timeout: 200 }}
          >
            <MenuItem selected onClick={handleClose}>
              <CheckIcon sx={{ marginRight: 1, fontSize: '18px' }} />
              CRC
            </MenuItem>
          </Menu>

          {/* Profile selector */}
          <Tooltip title="Select Profile">
            <IconButton
              color="inherit"
              aria-label="Select profile"
              onClick={handleProfileClick}
              sx={{
                display: 'flex',
                gap: 0.5,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <Typography variant="body2">{organizationName}</Typography>
              <ExpandMoreIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleClose}
            TransitionProps={{ timeout: 200 }}
          >
            <MenuItem selected onClick={handleClose}>
              <CheckIcon sx={{ marginRight: 1, fontSize: '18px' }} />
              CRC
            </MenuItem>
          </Menu>

          {/* Help */}
          <Tooltip title="Help">
            <IconButton
              color="inherit"
              aria-label="Open help"
              onClick={onHelpClick || (() => console.log('Help clicked'))}
              sx={{
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>

          {/* User profile */}
          <Tooltip title="User menu">
            <IconButton
              color="inherit"
              aria-label="Open user menu"
              onClick={handleUserClick}
              sx={{
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={handleClose}
            TransitionProps={{ timeout: 200 }}
          >
            <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
          </Menu>

          {/* Assist */}
          <Tooltip title="AI Assist">
            <IconButton
              color="inherit"
              aria-label="AI Assist"
              onClick={() => console.log('Assist clicked')}
              sx={{
                marginLeft: '16px',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                '&:focus': { outline: '2px solid #FFFFFF', outlineOffset: '2px' },
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: '20px' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
