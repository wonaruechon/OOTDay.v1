# AI Frontend Generation Prompts - Supply Management System

This document contains comprehensive, ready-to-use prompts for AI-powered frontend development tools (v0, Lovable, Cursor, etc.) to generate the Supply Management System UI components.

**Tech Stack Context:** React 18+ with TypeScript, Material-UI (MUI) v5+, React Query, Vite

**Design System:** Manhattan Active™ theme (custom MUI theme with navy/white/gray palette)

---

## Table of Contents

1. [Application Header Navigation](#1-application-header-navigation)
2. [Supply Details Dashboard - Complete Page](#2-supply-details-dashboard---complete-page)
3. [Filter Panel Component](#3-filter-panel-component)
4. [Data Table Component](#4-data-table-component)
5. [Pagination Controls Component](#5-pagination-controls-component)
6. [Dialog Components](#6-dialog-components)
7. [Bookmark Management](#7-bookmark-management)

---

## 1. Application Header Navigation

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create a fixed header navigation component for the Supply Management System with Manhattan Active™ branding, organization/profile selectors, bookmarks, help icon, and user menu dropdown.

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `AppHeader.tsx`
2. Use Material-UI AppBar component with position="fixed" for the header
3. Set the header to 64px height with navy background (#1B3A57) and white text
4. Arrange header items in this specific left-to-right order:
   - **Left section:**
     - Hamburger menu icon button (menu icon from @mui/icons-material/Menu)
     - "OMNI ENTERPRISE" text (18px, bold, white, 24px left margin)
   - **Right section (aligned to far right):**
     - Bookmarks icon button (bookmark_border icon)
     - Organization selector dropdown (shows "CRC", chevron down icon)
     - Profile selector dropdown (shows "CRC", chevron down icon)
     - Help icon button (help_outline icon)
     - User profile icon button (account_circle icon)
     - Assist icon button (auto_awesome icon, 16px left margin)
5. Implement dropdown menus for:
   - **Organization selector:** Opens menu below with single option "CRC" (selected, with checkmark)
   - **Profile selector:** Opens menu below with single option "CRC" (selected, with checkmark)
   - **User profile menu:** Opens menu with option: "Settings"
6. Add interactive states:
   - All icon buttons have hover effect (white background @ 10% opacity)
   - Active/focused icon buttons have 2px white outline offset 2px
   - Dropdown menus have smooth fade-in animation (200ms ease-out)
7. Make header responsive:
   - On tablet (<1280px), hide text labels on dropdowns, show only icons with tooltips
   - On mobile (<768px, not primary target but graceful degradation), collapse to hamburger menu
8. Add accessibility:
   - All icon buttons have aria-labels (e.g., "Open bookmarks menu")
   - Tooltips on all icon buttons (Material-UI Tooltip component)
   - Keyboard navigation: Tab through all interactive elements, Enter to activate

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Header Component Structure:**
```typescript
interface AppHeaderProps {
  organizationName?: string;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}
```

**Icons to Use (from @mui/icons-material):**
```typescript
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from '@mui/icons-material/Settings';
```

**Color Theme:**
```typescript
const headerStyles = {
  backgroundColor: '#1B3A57', // Navy
  color: '#FFFFFF',           // White text
  hoverBackground: 'rgba(255, 255, 255, 0.1)',
  focusOutline: '#FFFFFF',
}
```

**Constraints:**
- Header MUST remain fixed at top during page scroll (position: fixed, top: 0, z-index: 1100)
- Header MUST be full width (100vw)
- Use MUI AppBar, Toolbar, IconButton, Menu, MenuItem components
- DO NOT create settings dialog here; just trigger onSettingsClick prop
- Spacing between right-section items: 8px
- Icon size: 24px for all icons except Assist icon (20px)

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/AppHeader.tsx` - Header navigation component

**Files NOT to Modify:**
- Do NOT create any other page components
- Do NOT implement routing logic
- Do NOT create the Settings dialog (that's a separate component)

**Expected Output:**
A reusable header component that can be imported and placed at the top of any page. The component should be fully functional with working dropdown menus, hover states, and accessibility support. All interactive elements should log to console when clicked (in absence of actual handler implementations).
```

---

## 2. Supply Details Dashboard - Complete Page

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create the main Supply Details Dashboard page for the Supply Management System, integrating the header navigation, filter panel, data table, and pagination controls into a cohesive, full-page layout optimized for desktop workflows (1280px+ viewports).

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `SupplyDetailsDashboard.tsx`
2. Structure the page layout with these sections (top to bottom):
   - AppHeader component (imported, fixed at top)
   - Page title "SUPPLY" (34px, blue #1976D2, 24px left margin, 24px top margin from header)
   - FilterPanel component (imported, full width)
   - DataTable component (imported, fills remaining vertical space)
   - PaginationControls component (imported, fixed at bottom of table area)
3. Implement page layout:
   - Total page height: 100vh (full viewport)
   - Header: 64px fixed height
   - Remaining space allocated to: Page title (80px including margins) + Filter panel (auto height) + Table (flex-grow fills space) + Pagination (56px)
   - Use CSS Flexbox for vertical layout
4. Add spacing:
   - Left/right margins: 24px
   - Vertical spacing between sections: 16px
5. Implement data fetching logic (mock for now):
   - Use React Query (useQuery hook) to fetch supply data
   - Mock API endpoint: GET /api/supply-details with query parameters from filter state
   - Show loading skeleton in table during data fetch
   - Show error message if fetch fails (with retry button)
6. Manage filter state:
   - Use React useState to manage filter values
   - Pass filter state to FilterPanel component as props
   - Pass onFilterChange callback to update state when filters applied
   - Pass filter state as query parameters to API call
7. Manage table state:
   - Track selected rows (array of row IDs)
   - Track current page number
   - Track sort column and direction
   - Pass these states to DataTable component
8. Add responsive behavior:
   - On tablet (768-1279px), reduce left/right margins to 16px
   - On mobile (<768px, graceful degradation only), allow horizontal scroll for entire page
9. Add accessibility:
   - Page title has h1 semantic tag
   - Main content area has role="main"
   - Skip-to-content link (visually hidden, visible on focus) to jump past header

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Page Component Structure:**
```typescript
interface SupplyDetailsPageProps {
  // No props needed; page is self-contained
}

interface FilterState {
  locationId: string;
  itemId: string;
  supplyTypeId: string;
  view: string;
  includeErrored: 'yes' | 'no' | '';
  displayPendingReview: 'yes-and-no' | 'yes' | 'no';
}

interface SupplyDataItem {
  id: string;
  locationId: string;
  itemId: string;
  quantity: number;
  availableQuantity: number;
  supplyTypeId: string;
  error: boolean;
  pendingReview: boolean;
  // ... other fields from API
}
```

**Mock API Response:**
```typescript
interface SupplyDataResponse {
  data: SupplyDataItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}
```

**React Query Setup:**
```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['supplyData', filterState, page, sortBy],
  queryFn: () => fetchSupplyData(filterState, page, sortBy),
  staleTime: 5 * 60 * 1000, // 5 minutes cache
});
```

**Layout CSS (using MUI sx prop):**
```typescript
const pageStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
};

const contentStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: '64px', // Header height
  padding: '24px',
  overflow: 'auto',
};
```

**Constraints:**
- Use Material-UI Box component for layout containers
- Use React Query (@tanstack/react-query) for data fetching
- DO NOT implement actual API call; create mock function that returns sample data after 1 second delay (setTimeout)
- Page title "SUPPLY" should use MUI Typography component with variant="h1"
- Ensure table scrolls vertically within its container, not the entire page

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/pages/SupplyDetailsDashboard.tsx` - Main dashboard page component
- `src/api/supplyApi.ts` - Mock API functions (fetchSupplyData)
- `src/types/supply.ts` - TypeScript interfaces for supply data

**Files to Import (assume these exist):**
- `src/components/AppHeader.tsx`
- `src/components/FilterPanel.tsx`
- `src/components/DataTable.tsx`
- `src/components/PaginationControls.tsx`

**Files NOT to Modify:**
- Do NOT modify any imported components
- Do NOT create routing configuration

**Expected Output:**
A complete, functional dashboard page that orchestrates all child components and manages data fetching, filtering, and pagination state. The page should render with mock data and demonstrate proper layout, responsive behavior, and loading/error states.
```

---

## 3. Filter Panel Component

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create a comprehensive filter panel component with basic and advanced (MORE) filters for the Supply Management System, following the progressive disclosure design principle and Manhattan Active™ styling.

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `FilterPanel.tsx`
2. Create a two-section layout:
   - **Section 1: Basic Filters** (always visible)
     - 3 text input fields: Location ID, Item ID, Supply Type ID (each with search icon on right)
     - 3 dropdown selectors: View (13 options), Include Errored Supply? (Yes/No), Display Pending Review? (Yes & No/Yes/No)
     - Arrange in 2 rows on desktop:
       - Row 1: Location ID | Item ID | Supply Type ID
       - Row 2: View | Include Errored Supply | Display Pending Review
   - **Section 2: Advanced Filters** (collapsible, hidden by default)
     - 7 additional text input fields: Segment, Reference Type, Reference ID, Batch Number, Country of Origin, Inventory Type, Product Status
     - Arrange in 2-column grid
3. Add control buttons:
   - "MORE ▼" button to expand advanced filters (changes to "LESS ▲" when expanded)
   - "APPLY" button (primary, navy background) to submit filters
   - "CLEAR" button (secondary, outlined) to reset all fields
   - Arrange buttons: "MORE" on left, "APPLY" and "CLEAR" on right
4. Implement expand/collapse animation:
   - Advanced section slides down/up with height transition (300ms ease-out)
   - MORE button icon rotates 180 degrees when toggled
   - Expanded state persists in component state
5. Style the panel:
   - Background: Light gray (#F5F5F5)
   - Padding: 24px all sides
   - Border-bottom: 1px solid #E0E0E0 (separates from table below)
   - Section header "FILTER PANEL" (20px, medium weight, gray #616161)
6. Implement filter logic:
   - Use controlled inputs (React useState for all field values)
   - Pass filter values to parent via onFilterChange callback when APPLY clicked
   - Reset all fields to empty/default when CLEAR clicked
   - Disable APPLY button if no filters are set
7. Add dropdown options:
   - **View dropdown:** Select an option (default) | ECOM-TH-CFR-LOCD-STD | ECOM-TH-DSS-NW-ALL | ECOM-TH-DSS-NW-STD | ECOM-TH-DSS-LOCD-EXP | ECOM-TH-SSP-NW-STD | MKP-TH-SSP-NW-STD | MKP-TH-CFR-LOCD-STD | ECOM-TH-SSP-NW-ALL | MKP-TH-CFR-MANUAL-SYNC | CMG-ECOM-TH-STD | CMG-MKP-SHOPEE-TH-NTW-STD | CMG-MKP-LAZADA-TH-LOC-STD | CMG-MKP-MIRAKL-TH-NTW-STD
   - **Include Errored Supply:** Select an option (default) | Yes | No
   - **Display Pending Review:** Yes & No (default) | Yes | No
8. Make responsive:
   - On tablet (<1280px), stack filters in single column
   - On mobile (<768px), all fields full width
9. Add accessibility:
   - All inputs have visible labels
   - Proper ARIA labels for all fields
   - Tab order flows logically through all visible fields
   - Focus states on all inputs (2px navy outline)

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Component Props:**
```typescript
interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
  initialFilters?: Partial<FilterState>;
}

interface FilterState {
  locationId: string;
  itemId: string;
  supplyTypeId: string;
  view: string;
  includeErrored: string;
  displayPendingReview: string;
  // Advanced filters
  segment: string;
  referenceType: string;
  referenceId: string;
  batchNumber: string;
  countryOfOrigin: string;
  inventoryType: string;
  productStatus: string;
}
```

**MUI Components to Use:**
```typescript
import { TextField, Select, MenuItem, Button, Box, Collapse, IconButton } from '@mui/material';
import { Search, ExpandMore } from '@mui/icons-material';
```

**Layout Example (using MUI Grid):**
```typescript
<Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <TextField label="Location ID" ... />
  </Grid>
  <Grid item xs={12} md={4}>
    <TextField label="Item ID" ... />
  </Grid>
  {/* ... more fields */}
</Grid>
```

**Constraints:**
- Use MUI TextField with variant="outlined" for all text inputs
- Use MUI Select with variant="outlined" for all dropdowns
- Search icon should be inside TextField as InputAdornment (position="end")
- DO NOT implement actual API call for filter application; just call onFilterChange prop
- APPLY button should be disabled when all fields are empty
- Advanced filters should use Collapse component from MUI for smooth animation

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/FilterPanel.tsx` - Filter panel component

**Files NOT to Modify:**
- Do NOT create API integration here
- Do NOT manage global state (parent component handles that)

**Expected Output:**
A fully functional filter panel component with working expand/collapse, form validation, and callback props for parent integration. The component should be visually polished with proper spacing, alignment, and responsive behavior.
```

---

## 4. Data Table Component

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create a high-performance data table component using Material-UI Data Grid to display supply chain data with 25+ columns, row selection checkboxes, sorting, and horizontal scrolling for the Supply Management System.

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `SupplyDataTable.tsx`
2. Use MUI Data Grid component (@mui/x-data-grid) as the foundation
3. Define 25 table columns in this specific order:
   - **Core columns (always visible):**
     1. Checkbox column (for row selection, built-in Data Grid feature)
     2. Location ID
     3. Item ID
     4. Quantity (right-aligned, number formatted with commas)
     5. Available Quantity (right-aligned, number formatted with commas)
     6. Supply Type ID
     7. ERROR (displays "Yes" or "No", red color for "Yes")
     8. PENDING REVIEW (displays "Yes" or "No", orange color for "Yes")
   - **Extended columns (horizontal scroll):**
     9. Infinite Supply
     10. Kit Supply
     11. Segment
     12. Reference Type
     13. Reference ID
     14. Reference Detail ID
     15. ETA (date format: YYYY-MM-DD)
     16. Parent Reference Type
     17. Parent Reference ID
     18. Parent Reference Detail ID
     19. Batch Number
     20. Country of Origin
     21. Inventory Attribute 1
     22. Inventory Attribute 2
     23. Inventory Attribute 3
     24. Inventory Attribute 4
     25. Inventory Attribute 5
     26. Inventory Type
     27. Product Status
4. Configure Data Grid features:
   - Enable row selection with checkboxes (checkboxSelection prop)
   - Enable column sorting (sortingMode="server" - sorting handled by API)
   - Disable pagination in Data Grid (handled by separate PaginationControls component)
   - Enable horizontal scrolling for overflow columns
   - Sticky column headers during vertical scroll
   - Row height: 52px (standard density)
   - Header height: 56px
5. Style the table:
   - Alternate row background colors: White (#FFFFFF) and light gray (#F5F5F5)
   - Selected row background: Light blue (#BBDEFB) with white checkbox checkmark
   - Hover row background: Very light blue (#E3F2FD)
   - Column header background: White with bottom border (#E0E0E0)
   - Column header text: Bold (500 weight), 14px, dark gray (#212121)
   - Cell text: Regular (400 weight), 14px, dark gray (#212121)
   - Cell padding: 16px horizontal, 0px vertical (handled by row height)
6. Implement empty state:
   - When no data, display centered message: "No data to display" (16px, gray #616161)
   - Include subtle icon above text (inbox icon from MUI)
7. Implement loading state:
   - Use Data Grid built-in loading prop with skeleton rows
   - Show 10 skeleton rows with shimmer animation
8. Add number formatting:
   - Quantity and Available Quantity columns: Format with comma separators (e.g., 25320 → "25,320")
   - Use JavaScript Intl.NumberFormat for formatting
9. Add custom cell renderers:
   - ERROR column: Render "Yes" in red (#D32F2F) or "No" in gray
   - PENDING REVIEW column: Render "Yes" in orange (#ED6C02) or "No" in gray
   - ETA column: Format date as YYYY-MM-DD (if null, show empty cell)
10. Handle row selection:
    - Track selected row IDs in component state
    - Pass selection state to parent via onSelectionChange callback
    - Provide getSelectedRows method for parent to access selected data
11. Handle sorting:
    - When user clicks column header, call onSortChange callback with column ID and direction
    - Parent component updates API query with new sort
    - Data Grid re-renders with sorted data from API
12. Add accessibility:
    - All column headers have aria-sort attribute
    - Selected rows announced to screen readers
    - Keyboard navigation: Arrow keys move between cells, Space toggles selection

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Component Props:**
```typescript
interface SupplyDataTableProps {
  data: SupplyDataItem[];
  loading: boolean;
  error?: string;
  selectedRowIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

interface SupplyDataItem {
  id: string;
  locationId: string;
  itemId: string;
  quantity: number;
  availableQuantity: number;
  supplyTypeId: string;
  error: boolean;
  pendingReview: boolean;
  infiniteSupply: boolean;
  kitSupply: boolean;
  segment: string;
  referenceType: string;
  referenceId: string;
  referenceDetailId: string;
  eta: string | null; // ISO date string
  // ... other fields
}
```

**Column Definition Example:**
```typescript
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'locationId',
    headerName: 'Location ID',
    width: 150,
    sortable: true,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 130,
    align: 'right',
    headerAlign: 'right',
    sortable: true,
    valueFormatter: (params) => {
      return new Intl.NumberFormat('en-US').format(params.value);
    },
  },
  {
    field: 'error',
    headerName: 'ERROR',
    width: 100,
    sortable: true,
    renderCell: (params) => (
      <span style={{ color: params.value ? '#D32F2F' : '#616161' }}>
        {params.value ? 'Yes' : 'No'}
      </span>
    ),
  },
  // ... more columns
];
```

**Data Grid Configuration:**
```typescript
<DataGrid
  rows={data}
  columns={columns}
  checkboxSelection
  disableRowSelectionOnClick
  loading={loading}
  sortingMode="server"
  onSortModelChange={(model) => {
    if (model.length > 0) {
      onSortChange(model[0].field, model[0].sort);
    }
  }}
  rowSelectionModel={selectedRowIds}
  onRowSelectionModelChange={(ids) => onSelectionChange(ids as string[])}
  sx={{
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: '#F5F5F5',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#E3F2FD',
    },
    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: '#BBDEFB',
    },
    // ... more styles
  }}
/>
```

**Constraints:**
- MUST use @mui/x-data-grid (not @mui/x-data-grid-pro or free version limitations)
- Table MUST fill parent container height (use autoHeight={false})
- DO NOT implement inline editing (read-only table)
- DO NOT implement column hiding/showing (future enhancement)
- DO NOT implement column reordering (future enhancement)
- Ensure table performs well with 10,000 rows (use virtual scrolling, built into Data Grid)

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/SupplyDataTable.tsx` - Data table component

**Dependencies to Install:**
```bash
npm install @mui/x-data-grid
```

**Files NOT to Modify:**
- Do NOT create mock data here; data comes from parent via props
- Do NOT implement API calls; parent handles data fetching

**Expected Output:**
A high-performance, feature-rich data table component with working row selection, sorting callbacks, and polished styling. The table should handle large datasets efficiently and provide excellent user experience with clear visual feedback for all interactions.
```

---

## 5. Pagination Controls Component

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create a pagination control component for the data table with first/previous/next/last navigation buttons, page number input, and record counter, matching the Manhattan Active™ design system.

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `PaginationControls.tsx`
2. Create a horizontal layout with these elements (left to right):
   - **Left section:**
     - First page button (double left arrow icon, disabled on page 1)
     - Previous page button (left chevron icon, disabled on page 1)
     - Text: "Page" (14px, gray)
     - Page number input field (small, 60px width, accepts numeric input)
     - Text: "of [totalPages]" (14px, gray)
     - Next page button (right chevron icon, disabled on last page)
     - Last page button (double right arrow icon, disabled on last page)
   - **Right section:**
     - Text: "Displaying [start] - [end] of [total]" (14px, gray)
     - "RESET ERROR" button (red, enabled only when rows selected, fixed on right edge)
3. Implement pagination logic:
   - Calculate total pages from totalCount and pageSize props
   - Calculate start and end record numbers for display (e.g., page 1 of 10 rows = "Displaying 1 - 10 of 8165")
   - When user clicks navigation button, call onPageChange callback with new page number
   - When user types in page input and presses Enter, validate and jump to that page
4. Style the controls:
   - Background: White (#FFFFFF)
   - Height: 56px
   - Padding: 12px horizontal
   - Top border: 1px solid #E0E0E0 (separates from table above)
   - All buttons: Icon buttons with hover effect (light gray background on hover)
   - Page input: Small outlined text field, centered text
5. Handle page input validation:
   - Only accept numeric input (1 to totalPages)
   - If invalid input, reset to current page on blur
   - If user enters page > totalPages, clamp to totalPages
   - If user enters page < 1, clamp to 1
6. Implement disabled states:
   - First and Previous buttons disabled when currentPage === 1
   - Next and Last buttons disabled when currentPage === totalPages
   - Disabled buttons have 40% opacity and cursor: not-allowed
7. Add "RESET ERROR" button:
   - Positioned on far right edge
   - Red background (#D32F2F) when enabled
   - Grayed out (disabled, 40% opacity) when no rows selected
   - Shows count when enabled: "RESET ERROR ([count])"
   - Calls onResetError callback when clicked
8. Make responsive:
   - On tablet (<1280px), reduce spacing between elements
   - On mobile (<768px), stack in 2 rows: navigation controls on row 1, record counter on row 2
9. Add accessibility:
   - All icon buttons have aria-labels (e.g., "First page", "Previous page")
   - Page input has aria-label "Jump to page"
   - Record counter has aria-live="polite" to announce changes to screen readers

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Component Props:**
```typescript
interface PaginationControlsProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  selectedRowCount: number;
  onPageChange: (page: number) => void;
  onResetError: () => void;
}
```

**Calculation Logic:**
```typescript
const totalPages = Math.ceil(totalCount / pageSize);
const startRecord = (currentPage - 1) * pageSize + 1;
const endRecord = Math.min(currentPage * pageSize, totalCount);

// Example: Page 2, pageSize 10, totalCount 8165
// totalPages = 817
// startRecord = 11
// endRecord = 20
// Display: "Displaying 11 - 20 of 8165"
```

**Icons to Use (from @mui/icons-material):**
```typescript
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
```

**Layout Example:**
```typescript
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', padding: '0 12px', borderTop: '1px solid #E0E0E0' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <IconButton disabled={currentPage === 1} onClick={() => onPageChange(1)}>
      <FirstPageIcon />
    </IconButton>
    {/* ... more controls */}
  </Box>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Typography variant="body2">Displaying {startRecord} - {endRecord} of {totalCount}</Typography>
    <Button variant="contained" color="error" disabled={selectedRowCount === 0} onClick={onResetError}>
      RESET ERROR {selectedRowCount > 0 && `(${selectedRowCount})`}
    </Button>
  </Box>
</Box>
```

**Constraints:**
- Use MUI IconButton component for navigation buttons
- Use MUI TextField with type="number" for page input (variant="outlined", size="small")
- Use MUI Button for "RESET ERROR" (variant="contained", color="error")
- DO NOT implement the actual error reset logic; just call onResetError prop
- Page input should not have spinner arrows (use CSS to hide: input[type=number]::-webkit-inner-spin-button)
- Ensure all calculations handle edge cases (e.g., totalCount = 0, last page with partial results)

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/PaginationControls.tsx` - Pagination component

**Files NOT to Modify:**
- Do NOT implement data fetching or state management
- Do NOT create the reset error API call

**Expected Output:**
A fully functional pagination control component that handles all edge cases, provides clear visual feedback, and integrates seamlessly with the data table above it. The component should be reusable and work with any paginated data source.
```

---

## 6. Dialog Components

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create three reusable dialog components for the Supply Management System: Confirmation Dialog (for bulk actions), Bookmark Save Dialog, and Settings Dialog, all following Manhattan Active™ design patterns.

# DETAILED STEP-BY-STEP INSTRUCTIONS

## A. Confirmation Dialog Component

1. Create a React TypeScript component file named `ConfirmationDialog.tsx`
2. Use MUI Dialog component as the foundation
3. Structure the dialog:
   - Title at top (20px, medium weight, dark gray)
   - Message text in content area (14px, regular weight, gray)
   - Two buttons at bottom right: "Cancel" (secondary, outlined) and action button (primary or error variant)
   - Close icon (X) at top-right corner
4. Make the dialog flexible:
   - Accept props for title, message, confirmButtonText, confirmButtonColor (primary/error)
   - onConfirm and onCancel callbacks
   - open boolean to control visibility
5. Style the dialog:
   - Dialog width: 500px max
   - Padding: 24px
   - Border radius: 4px
   - Semi-transparent overlay (#000000 @ 50% opacity)
   - Fade-in animation (250ms ease-out)
6. Implement interactions:
   - Clicking "Cancel" or X closes dialog (calls onCancel)
   - Clicking action button calls onConfirm and closes dialog
   - Escape key closes dialog (calls onCancel)
   - Clicking outside overlay closes dialog (optional, via disableBackdropClick prop)
7. Add focus trap:
   - Focus moves to action button when dialog opens
   - Tab cycles through close icon, cancel button, confirm button
8. Add accessibility:
   - Dialog has role="dialog" and aria-labelledby for title
   - Focus trap implemented (built into MUI Dialog)

## B. Bookmark Save Dialog Component

1. Create a React TypeScript component file named `BookmarkSaveDialog.tsx`
2. Use MUI Dialog component
3. Structure the dialog:
   - Title: "Save Bookmark" (20px, medium weight)
   - Text input: "Bookmark Name" label, placeholder "e.g., Location CFM2372"
   - Character counter below input: "[current]/50 characters" (12px, gray)
   - Helper text: "Choose a descriptive name to easily find this view later"
   - Buttons: "Cancel" and "Save Bookmark" (disabled until valid name entered)
4. Implement validation:
   - Bookmark name required (min 1 character, max 50 characters)
   - No duplicate names (accept existingBookmarkNames array prop to check)
   - Show error message below input if duplicate: "A bookmark with this name already exists"
5. Style the dialog:
   - Dialog width: 450px
   - Input field full width within dialog
   - Save button primary blue, disabled state grayed out
6. Pre-fill logic:
   - Accept suggestedName prop (e.g., generated from current filters)
   - Pre-fill input with suggestedName when dialog opens
   - Select all text on open for easy editing
7. Implement callbacks:
   - onSave(name: string) called with bookmark name when saved
   - onCancel() called when canceled or closed
8. Add accessibility:
   - Input has aria-describedby linking to helper text and error message
   - Focus moves to input field when dialog opens

## C. Settings Dialog Component

1. Create a React TypeScript component file named `SettingsDialog.tsx`
2. Use MUI Dialog component
3. Structure the dialog:
   - Title: "User Settings" (20px, medium weight)
   - Tab navigation: "Preferences" tab (active) | "Profile" tab (grayed out, future)
   - **Preferences tab content:**
     - "Default Page Size" dropdown: 10 | 25 | 50 | 100 (default: 10)
     - "Default View" dropdown: [all 13 view options from filter panel] (default: first option)
     - "Language" radio buttons: Thai | English (default: English)
     - "Theme" radio buttons: System | Light | Dark (all grayed out, future enhancement)
   - Buttons at bottom: "Cancel" and "Save Settings"
4. Implement form logic:
   - Accept currentSettings prop with default values
   - Use local state for form values (controlled inputs)
   - Validate settings (all fields required)
   - Call onSave(settings) with updated settings object
5. Style the dialog:
   - Dialog width: 600px
   - Tabs at top with underline indicator
   - Form fields in vertical layout with 16px spacing
   - Labels left-aligned, inputs below labels
6. Implement persistence:
   - When user saves, call onSave callback with settings object
   - Parent component handles saving to localStorage
7. Add accessibility:
   - Tab navigation with aria-selected
   - Radio buttons grouped with fieldset and legend
   - All form controls have labels

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

## Confirmation Dialog

**Component Props:**
```typescript
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmButtonText?: string; // default: "Confirm"
  confirmButtonColor?: 'primary' | 'error'; // default: 'primary'
  onConfirm: () => void;
  onCancel: () => void;
}
```

**Usage Example:**
```typescript
<ConfirmationDialog
  open={isConfirmOpen}
  title="Reset Errors?"
  message="This will reset error status for 5 selected items. This action cannot be undone."
  confirmButtonText="Reset Errors"
  confirmButtonColor="error"
  onConfirm={handleResetErrors}
  onCancel={() => setIsConfirmOpen(false)}
/>
```

## Bookmark Save Dialog

**Component Props:**
```typescript
interface BookmarkSaveDialogProps {
  open: boolean;
  suggestedName?: string;
  existingBookmarkNames: string[];
  onSave: (name: string) => void;
  onCancel: () => void;
}
```

## Settings Dialog

**Component Props:**
```typescript
interface SettingsDialogProps {
  open: boolean;
  currentSettings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onCancel: () => void;
}

interface UserSettings {
  defaultPageSize: 10 | 25 | 50 | 100;
  defaultView: string;
  language: 'thai' | 'english';
}
```

**Constraints:**
- All dialogs use MUI Dialog, DialogTitle, DialogContent, DialogActions components
- All dialogs have maxWidth prop set to appropriate size
- Close icon uses MUI IconButton with CloseIcon from @mui/icons-material
- DO NOT implement actual API calls for saving; just call callback props
- All dialogs should use controlled component pattern (open prop controls visibility)
- Buttons should have proper loading states (show CircularProgress when saving, future enhancement)

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/ConfirmationDialog.tsx`
- `src/components/BookmarkSaveDialog.tsx`
- `src/components/SettingsDialog.tsx`

**Files NOT to Modify:**
- Do NOT implement the API integration for saving
- Do NOT create global state management for dialogs

**Expected Output:**
Three fully functional, reusable dialog components that can be imported and used throughout the application. Each dialog should handle its own internal state (form values) but delegate persistence to parent components via callbacks. All dialogs should have polished styling, animations, and accessibility support.
```

---

## 7. Bookmark Management

### Prompt for AI Generation Tool:

```
# HIGH-LEVEL GOAL
Create a bookmark management system with a dropdown menu component for saving, accessing, and deleting filter bookmarks, integrated with the application header navigation.

# DETAILED STEP-BY-STEP INSTRUCTIONS

1. Create a React TypeScript component file named `BookmarkDropdown.tsx`
2. Create a dropdown menu that opens when bookmarks icon button in header is clicked
3. Structure the menu:
   - **Header section:**
     - "Bookmarks" title (16px, medium weight)
     - Close icon (X) at top-right (for mobile/tablet)
   - **Content section:**
     - If no bookmarks: Empty state message "No saved bookmarks" with subtitle "Click 'Save Current View' to create your first bookmark"
     - If bookmarks exist: List of saved bookmarks (max 10)
   - **Footer section:**
     - Divider line
     - "Save Current View" button (full width, outlined)
4. Implement bookmark list items:
   - Each item shows: Bookmark name (14px, dark text) + Delete icon button (trash icon, right-aligned)
   - Clicking bookmark name closes menu and loads saved filters (calls onBookmarkClick callback)
   - Clicking delete icon shows confirmation: "Delete '[name]'?" with Cancel/Delete buttons
   - Hover state: Light gray background
5. Style the dropdown:
   - Width: 320px on desktop, full screen on mobile
   - Max height: 400px with scroll if >10 bookmarks
   - Padding: 16px
   - Border radius: 4px (desktop), 0px (mobile full screen)
   - Shadow: MUI elevation 8
6. Implement "Save Current View" flow:
   - Clicking button opens BookmarkSaveDialog component
   - After saving, new bookmark appears at top of list
   - If 10 bookmarks already exist, show error: "Maximum 10 bookmarks reached. Delete one to add a new bookmark."
7. Manage bookmark state:
   - Accept bookmarks array prop (managed by parent/global state)
   - Provide callbacks: onBookmarkClick(bookmark), onBookmarkDelete(bookmarkId), onBookmarkSave(name, filters)
   - Parent component handles persistence (localStorage or API)
8. Add default bookmarks:
   - Pre-populate with 2 default bookmarks (cannot be deleted):
     - "All Locations" - no filters applied
     - "Error Items" - Include Errored Supply = Yes
   - Default bookmarks have locked icon instead of delete icon
9. Implement search/filter (optional, future enhancement):
   - Add search input at top of bookmark list
   - Filter bookmarks by name as user types
10. Add accessibility:
    - Dropdown menu has role="menu"
    - Each bookmark item has role="menuitem"
    - Keyboard navigation: Arrow keys to navigate, Enter to select, Delete key on focused item to delete
    - Focus returns to bookmarks icon button when menu closes

# CODE EXAMPLES, DATA STRUCTURES & CONSTRAINTS

**Component Props:**
```typescript
interface BookmarkDropdownProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  bookmarks: Bookmark[];
  currentFilters: FilterState; // to save new bookmark
  onClose: () => void;
  onBookmarkClick: (bookmark: Bookmark) => void;
  onBookmarkDelete: (bookmarkId: string) => void;
  onBookmarkSave: (name: string, filters: FilterState) => void;
}

interface Bookmark {
  id: string;
  name: string;
  filters: FilterState;
  isDefault?: boolean; // cannot be deleted if true
  createdAt: string; // ISO timestamp
}
```

**Default Bookmarks:**
```typescript
const defaultBookmarks: Bookmark[] = [
  {
    id: 'default-all',
    name: 'All Locations',
    filters: {
      locationId: '',
      itemId: '',
      // ... all filters empty
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
      includeErrored: 'yes',
      // ... other filters empty
    },
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
];
```

**Menu Structure (using MUI Menu and MenuItem):**
```typescript
<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={onClose}
  PaperProps={{
    sx: { width: 320, maxHeight: 400 }
  }}
>
  <MenuItem disabled>
    <Typography variant="subtitle1" fontWeight={500}>Bookmarks</Typography>
  </MenuItem>
  <Divider />
  {bookmarks.length === 0 ? (
    <MenuItem disabled>
      <Typography variant="body2" color="textSecondary">No saved bookmarks</Typography>
    </MenuItem>
  ) : (
    bookmarks.map((bookmark) => (
      <MenuItem key={bookmark.id} onClick={() => onBookmarkClick(bookmark)}>
        <Typography>{bookmark.name}</Typography>
        {!bookmark.isDefault && (
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(bookmark.id); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </MenuItem>
    ))
  )}
  <Divider />
  <MenuItem onClick={handleSaveCurrentView}>
    <BookmarkAddIcon sx={{ mr: 1 }} />
    <Typography>Save Current View</Typography>
  </MenuItem>
</Menu>
```

**Icons to Use:**
```typescript
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
```

**Constraints:**
- Use MUI Menu component (not Popover or custom dropdown)
- DO NOT implement localStorage persistence here; parent handles that
- Maximum 10 user bookmarks (plus 2 default = 12 total displayed)
- Bookmarks should be sorted: Defaults first, then user bookmarks by createdAt desc (newest first)
- When opening BookmarkSaveDialog, pass current filters from parent
- Delete confirmation should use ConfirmationDialog component created earlier

# DEFINE STRICT SCOPE

**Files to Create:**
- `src/components/BookmarkDropdown.tsx` - Bookmark dropdown menu component

**Files to Import:**
- `src/components/BookmarkSaveDialog.tsx` (created in previous prompt)
- `src/components/ConfirmationDialog.tsx` (created in previous prompt)

**Files NOT to Modify:**
- Do NOT create bookmark persistence logic; parent component handles that

**Expected Output:**
A fully functional bookmark dropdown component that integrates with the header navigation, supports saving, loading, and deleting bookmarks, and provides a polished user experience with proper hover states, animations, and accessibility. The component should work seamlessly with the BookmarkSaveDialog and ConfirmationDialog components.
```

---

## General Notes for All Prompts

### ⚠️ Important Reminders

1. **Human Review Required:** All AI-generated code MUST be carefully reviewed, tested, and refined by human developers before being considered production-ready.

2. **Iterative Approach:** These prompts are designed for generating one component at a time. Build and test each component individually before integrating into the larger application.

3. **Dependencies:** Ensure all required packages are installed:
   ```bash
   npm install @mui/material @mui/icons-material @mui/x-data-grid @emotion/react @emotion/styled @tanstack/react-query axios
   ```

4. **Theme Setup:** Before generating components, create the Manhattan Active™ MUI theme configuration file:
   ```typescript
   // src/theme/theme.ts
   import { createTheme } from '@mui/material/styles';

   export const manhattanTheme = createTheme({
     palette: {
       primary: {
         main: '#1B3A57',
         light: '#2E5073',
         dark: '#0D1F2F',
       },
       secondary: {
         main: '#1976D2',
       },
       error: {
         main: '#D32F2F',
       },
       warning: {
         main: '#ED6C02',
       },
       success: {
         main: '#2E7D32',
       },
       text: {
         primary: '#212121',
         secondary: '#616161',
       },
       background: {
         default: '#FFFFFF',
         paper: '#F5F5F5',
       },
     },
     typography: {
       fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
       h1: {
         fontSize: '34px',
         fontWeight: 400,
         lineHeight: 1.2,
       },
       h2: {
         fontSize: '24px',
         fontWeight: 500,
         lineHeight: 1.3,
       },
       body1: {
         fontSize: '16px',
         lineHeight: 1.5,
       },
       body2: {
         fontSize: '14px',
         lineHeight: 1.5,
       },
     },
     spacing: 8, // 8px base unit
   });
   ```

5. **Testing Strategy:** After generating each component:
   - Test accessibility with keyboard navigation
   - Test responsive behavior at different viewport sizes
   - Test all interactive states (hover, focus, active, disabled)
   - Test with screen reader (NVDA, VoiceOver, or JAWS)
   - Validate against WCAG AA standards

6. **Integration Order:** Recommended order for implementing components:
   1. Theme setup
   2. Application Header Navigation
   3. Dialog Components (needed by other components)
   4. Filter Panel Component
   5. Pagination Controls Component
   6. Data Table Component (depends on pagination)
   7. Bookmark Management (depends on dialogs)
   8. Supply Details Dashboard (integrates all components)

---

**Document created by:** Sally 🎨 (UX Expert)
**Date:** October 7, 2025
**Purpose:** AI-assisted frontend component generation for Supply Management System
**Based on:** Front-End Specification v1.0
