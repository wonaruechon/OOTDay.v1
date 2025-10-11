# Omnia Supply Management System

A comprehensive Supply Management System built with React, TypeScript, Material-UI, and following the Manhattan Active™ design system.

## Features

### 1. Application Header Navigation
- Fixed header with Manhattan Active™ branding
- Organization and profile selectors
- Bookmarks menu integration
- Help and user settings access
- AI Assist button
- Fully accessible with keyboard navigation

### 2. Filter Panel
- Basic filters: Location ID, Item ID, Supply Type ID
- Dropdown filters: View, Include Errored Supply, Display Pending Review
- Advanced filters (collapsible): Segment, Reference Type, Reference ID, Batch Number, Country of Origin, Inventory Type, Product Status
- Progressive disclosure design with MORE/LESS toggle
- Apply and Clear functionality

### 3. Data Table
- High-performance data grid with 27 columns
- Row selection with checkboxes
- Server-side sorting
- Horizontal scrolling for overflow columns
- Sticky column headers
- Alternate row colors for better readability
- Custom cell renderers for ERROR and PENDING REVIEW columns
- Number formatting for quantity columns
- Empty state with icon and message
- Loading skeleton animation

### 4. Pagination Controls
- First, Previous, Next, Last navigation buttons
- Direct page number input with validation
- Record counter showing current range
- Reset Error button (enabled when rows selected)
- Fully accessible

### 5. Confirmation Dialog
- Reusable modal dialog component
- Used for bulk actions like Reset Error
- Customizable title, message, and button colors
- Escape key and overlay click support

### 6. Settings Dialog
- User preferences management
- Default page size (10/25/50/100)
- Default view selection
- Language selection (Thai/English)
- Theme selection (coming soon)
- Tab navigation for future Profile section
- Settings persist to localStorage

### 7. Bookmark Management
- Save current filter state as bookmarks
- Default bookmarks: "All Locations" and "Error Items"
- User bookmarks (max 10)
- Delete user bookmarks (default bookmarks locked)
- Bookmarks persist to localStorage
- Quick access from header

### 8. Dashboard Integration
- Orchestrates all components
- State management for filters, pagination, sorting, selection
- React Query for data fetching with caching
- localStorage persistence for settings and bookmarks
- Responsive layout optimized for desktop (1280px+)

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v5** - UI component library
- **MUI X Data Grid** - High-performance data table
- **React Query (TanStack Query)** - Data fetching and caching
- **Emotion** - CSS-in-JS styling

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── supplyApi.ts          # Mock API functions
│   ├── components/
│   │   ├── AppHeader.tsx          # Application header
│   │   ├── BookmarkDropdown.tsx   # Bookmark menu
│   │   ├── BookmarkSaveDialog.tsx # Save bookmark dialog
│   │   ├── ConfirmationDialog.tsx # Reusable confirmation modal
│   │   ├── FilterPanel.tsx        # Filter controls
│   │   ├── PaginationControls.tsx # Pagination UI
│   │   ├── SettingsDialog.tsx     # User settings modal
│   │   └── SupplyDataTable.tsx    # Data grid component
│   ├── pages/
│   │   └── SupplyDetailsDashboard.tsx # Main dashboard page
│   ├── theme/
│   │   └── theme.ts               # Manhattan Active™ theme
│   ├── types/
│   │   └── supply.ts              # TypeScript interfaces
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts             # Vite type definitions
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                # Vite config
└── README.md                      # This file
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The development server will start at `http://localhost:5173/`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Design System - Manhattan Active™

### Colors

- **Primary Navy**: `#1B3A57` - Header, primary buttons, focus states
- **Secondary Blue**: `#1976D2` - Page title, links
- **Error Red**: `#D32F2F` - Error indicators, destructive actions
- **Warning Orange**: `#ED6C02` - Pending review indicators
- **Success Green**: `#2E7D32` - Success states
- **Text Primary**: `#212121` - Main text
- **Text Secondary**: `#616161` - Secondary text, labels
- **Background Default**: `#FFFFFF` - Page background
- **Background Paper**: `#F5F5F5` - Panel backgrounds

### Typography

- **Font Family**: Roboto, system fonts
- **H1**: 34px, weight 400 - Page titles
- **H2**: 24px, weight 500 - Section headers
- **Body1**: 16px - Regular text
- **Body2**: 14px - Secondary text

### Spacing

Base spacing unit: 8px

### Interactive States

- **Hover**: Light background overlay (rgba(255, 255, 255, 0.1) for dark, #F5F5F5 for light)
- **Focus**: 2px outline with 2px offset in accent color
- **Active/Selected**: Background color change with visual feedback
- **Disabled**: 40% opacity, cursor: not-allowed

## Mock Data

The application uses mock data generated in `supplyApi.ts` with:
- 8,165 total supply records
- Realistic data for all 27 columns
- Filtering and sorting support
- Pagination support
- Simulated API delay (1 second)

## Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management in dialogs
- Skip to content link
- Screen reader announcements for dynamic content
- Sufficient color contrast ratios (WCAG 2.1 AA compliant)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Optimized for desktop viewports 1280px and above.

## Future Enhancements

- [ ] Dark theme support
- [ ] User profile management
- [ ] Real API integration
- [ ] Column hiding/showing
- [ ] Column reordering
- [ ] Export to CSV/Excel
- [ ] Advanced search
- [ ] Bulk operations
- [ ] Audit trail
- [ ] Real-time updates

## License

Proprietary - Omnia Enterprise

## Author

Built with detailed specifications following Manhattan Active™ design principles.
