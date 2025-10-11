import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AppHeader from '../components/AppHeader';
import FilterPanel from '../components/FilterPanel';
import SupplyDataTable from '../components/SupplyDataTable';
import PaginationControls from '../components/PaginationControls';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SettingsDialog from '../components/SettingsDialog';
import BookmarkDropdown from '../components/BookmarkDropdown';
import { FilterState, UserSettings, Bookmark } from '../types/supply';
import { fetchSupplyData, resetErrorStatus } from '../api/supplyApi';

// Default bookmarks
const defaultBookmarks: Bookmark[] = [
  {
    id: 'default-all',
    name: 'All Locations',
    filters: {
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
    },
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'default-errors',
    name: 'Error Items',
    filters: {
      locationId: '',
      itemId: '',
      supplyTypeId: '',
      view: '',
      includeErrored: 'yes',
      displayPendingReview: 'yes-and-no',
      segment: '',
      referenceType: '',
      referenceId: '',
      batchNumber: '',
      countryOfOrigin: '',
      inventoryType: '',
      productStatus: '',
    },
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
];

const SupplyDetailsDashboard: React.FC = () => {
  // Load settings from localStorage
  const loadSettings = (): UserSettings => {
    const stored = localStorage.getItem('supplyManagementSettings');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      defaultPageSize: 10,
      defaultView: '',
      language: 'english',
    };
  };

  // Load bookmarks from localStorage
  const loadBookmarks = (): Bookmark[] => {
    const stored = localStorage.getItem('supplyManagementBookmarks');
    if (stored) {
      const userBookmarks = JSON.parse(stored);
      return [...defaultBookmarks, ...userBookmarks];
    }
    return defaultBookmarks;
  };

  // State management
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
  });

  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(settings.defaultPageSize);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // Dialog states
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [resetErrorDialogOpen, setResetErrorDialogOpen] = useState(false);
  const [bookmarkMenuAnchor, setBookmarkMenuAnchor] = useState<null | HTMLElement>(null);

  // Fetch data with React Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['supplyData', filters, currentPage, pageSize, sortField, sortDirection],
    queryFn: () =>
      fetchSupplyData(
        filters,
        currentPage,
        pageSize,
        sortField || undefined,
        sortDirection || undefined
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Filter handlers
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    setSelectedRowIds([]); // Clear selection
  };

  const handleFilterClear = () => {
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
    setCurrentPage(1);
    setSelectedRowIds([]);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRowIds([]);
  };

  // Table handlers
  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedRowIds(selectedIds);
  };

  const handleSortChange = (field: string, direction: 'asc' | 'desc' | null) => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Reset error handler
  const handleResetErrorClick = () => {
    if (selectedRowIds.length > 0) {
      setResetErrorDialogOpen(true);
    }
  };

  const handleResetErrorConfirm = async () => {
    try {
      await resetErrorStatus(selectedRowIds);
      setResetErrorDialogOpen(false);
      setSelectedRowIds([]);
      refetch(); // Refresh data
    } catch (error) {
      console.error('Failed to reset error status:', error);
    }
  };

  // Settings handlers
  const handleSettingsClick = () => {
    setSettingsDialogOpen(true);
  };

  const handleSettingsSave = (newSettings: UserSettings) => {
    setSettings(newSettings);
    setPageSize(newSettings.defaultPageSize);
    localStorage.setItem('supplyManagementSettings', JSON.stringify(newSettings));
    setSettingsDialogOpen(false);
  };

  // Bookmark handlers
  const handleBookmarksClick = (event: React.MouseEvent<HTMLElement>) => {
    setBookmarkMenuAnchor(event.currentTarget);
  };

  const handleBookmarkClick = (bookmark: Bookmark) => {
    setFilters(bookmark.filters);
    setCurrentPage(1);
    setSelectedRowIds([]);
  };

  const handleBookmarkSave = (name: string, filterState: FilterState) => {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      name,
      filters: filterState,
      isDefault: false,
      createdAt: new Date().toISOString(),
    };

    const userBookmarks = bookmarks.filter((b) => !b.isDefault);
    const updatedUserBookmarks = [newBookmark, ...userBookmarks];
    localStorage.setItem('supplyManagementBookmarks', JSON.stringify(updatedUserBookmarks));
    setBookmarks([...defaultBookmarks, ...updatedUserBookmarks]);
  };

  const handleBookmarkDelete = (bookmarkId: string) => {
    const updatedBookmarks = bookmarks.filter((b) => b.id !== bookmarkId);
    const userBookmarks = updatedBookmarks.filter((b) => !b.isDefault);
    localStorage.setItem('supplyManagementBookmarks', JSON.stringify(userBookmarks));
    setBookmarks(updatedBookmarks);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <AppHeader
        onSettingsClick={handleSettingsClick}
        onHelpClick={() => console.log('Help clicked')}
        onBookmarksClick={handleBookmarksClick}
      />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '64px',
          zIndex: 9999,
          padding: '8px',
          backgroundColor: '#1B3A57',
          color: '#FFFFFF',
          textDecoration: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to content
      </a>

      {/* Main content */}
      <Box
        id="main-content"
        role="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginTop: '64px',
          overflow: 'hidden',
        }}
      >
        {/* Page title */}
        <Box sx={{ padding: '24px 24px 0 24px' }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '34px',
              fontWeight: 400,
              color: '#1976D2',
              marginBottom: '24px',
            }}
          >
            SUPPLY
          </Typography>
        </Box>

        {/* Filter panel */}
        <FilterPanel
          onFilterChange={handleFilterChange}
          onClear={handleFilterClear}
          initialFilters={filters}
        />

        {/* Data table */}
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SupplyDataTable
            data={data?.data || []}
            loading={isLoading}
            error={isError ? 'Failed to load data' : undefined}
            selectedRowIds={selectedRowIds}
            onSelectionChange={handleSelectionChange}
            onSortChange={handleSortChange}
            sortField={sortField}
            sortDirection={sortDirection || undefined}
          />

          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalCount={data?.totalCount || 0}
            pageSize={pageSize}
            selectedRowCount={selectedRowIds.length}
            onPageChange={handlePageChange}
            onResetError={handleResetErrorClick}
          />
        </Box>
      </Box>

      {/* Dialogs */}
      <ConfirmationDialog
        open={resetErrorDialogOpen}
        title="Reset Errors?"
        message={`This will reset error status for ${selectedRowIds.length} selected item(s). This action cannot be undone.`}
        confirmButtonText="Reset Errors"
        confirmButtonColor="error"
        onConfirm={handleResetErrorConfirm}
        onCancel={() => setResetErrorDialogOpen(false)}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        currentSettings={settings}
        onSave={handleSettingsSave}
        onCancel={() => setSettingsDialogOpen(false)}
      />

      <BookmarkDropdown
        open={Boolean(bookmarkMenuAnchor)}
        anchorEl={bookmarkMenuAnchor}
        bookmarks={bookmarks}
        currentFilters={filters}
        onClose={() => setBookmarkMenuAnchor(null)}
        onBookmarkClick={handleBookmarkClick}
        onBookmarkDelete={handleBookmarkDelete}
        onBookmarkSave={handleBookmarkSave}
      />
    </Box>
  );
};

export default SupplyDetailsDashboard;
