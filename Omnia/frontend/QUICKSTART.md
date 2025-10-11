# Quick Start Guide - Supply Management System

## Installation & Running

### 1. Install Dependencies
```bash
cd /Users/naruechon/Documents/Project/Omnia/frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5173/**

### 3. Build for Production
```bash
npm run build
npm run preview
```

## First Time Usage

### Default Settings
- **Page Size**: 10 rows per page
- **Language**: English
- **Default Bookmarks**: "All Locations", "Error Items"

### Try These Features

#### 1. Filter Data
1. Enter values in **Location ID**, **Item ID**, or **Supply Type ID** fields
2. Select from **View** dropdown (13 options)
3. Choose **Include Errored Supply** (Yes/No)
4. Select **Display Pending Review** (Yes & No/Yes/No)
5. Click **MORE** to see 7 additional advanced filters
6. Click **APPLY** to filter data
7. Click **CLEAR** to reset all filters

#### 2. Sort Data
- Click any column header to sort ascending
- Click again to sort descending
- Click a third time to remove sorting

#### 3. Select Rows
- Check individual row checkboxes
- Check the header checkbox to select all visible rows
- Selected count appears in **RESET ERROR** button

#### 4. Navigate Pages
- Use First/Previous/Next/Last buttons
- Type a page number and press Enter to jump
- Record counter shows "Displaying X - Y of Z"

#### 5. Reset Errors
1. Select one or more rows with errors
2. Click **RESET ERROR (X)** button
3. Confirm in dialog
4. Errors are cleared and data refreshes

#### 6. Save Bookmarks
1. Apply some filters
2. Click bookmarks icon in header
3. Click **Save Current View**
4. Enter a name
5. Click **Save Bookmark**
6. Your bookmark appears in the menu

#### 7. Load Bookmarks
1. Click bookmarks icon in header
2. Click any bookmark name
3. Filters are automatically applied

#### 8. Delete Bookmarks
1. Click bookmarks icon in header
2. Click trash icon next to user bookmark
3. Confirm deletion
4. (Default bookmarks cannot be deleted)

#### 9. Change Settings
1. Click user profile icon in header
2. Click **Settings**
3. Change **Default Page Size** (10/25/50/100)
4. Change **Default View** (13 options)
5. Change **Language** (Thai/English)
6. Click **Save Settings**

## Component Hierarchy

```
App.tsx
└── SupplyDetailsDashboard.tsx (Main Page)
    ├── AppHeader.tsx
    │   └── [User menu, org selector, bookmarks button]
    │
    ├── FilterPanel.tsx
    │   ├── Basic Filters (6 fields)
    │   └── Advanced Filters (7 fields, collapsible)
    │
    ├── SupplyDataTable.tsx
    │   └── [27 columns with sorting, selection]
    │
    ├── PaginationControls.tsx
    │   └── [Navigation, page input, reset error button]
    │
    ├── ConfirmationDialog.tsx (Reset Error)
    ├── SettingsDialog.tsx
    └── BookmarkDropdown.tsx
        ├── BookmarkSaveDialog.tsx
        └── ConfirmationDialog.tsx (Delete Bookmark)
```

## Mock Data Details

### Total Records: 8,165
Mock data includes:
- 5 Location IDs (LOC001-LOC005)
- 5 Item IDs (ITEM-A001 to ITEM-E005)
- 4 Supply Types (PHYSICAL, VIRTUAL, CONSIGNMENT, DROP-SHIP)
- 15% of records have errors
- 25% of records are pending review
- Realistic quantities (100-10,000 range)
- Random dates for ETA field
- Full data for all 27 columns

### Filtering
All filters work on the mock data:
- Text filters: Case-insensitive substring match
- Dropdowns: Exact match
- Combine multiple filters for precise results

### Sorting
- Click any column header to sort
- Sorting is server-side (handled by mock API)
- Supports ascending and descending

## Keyboard Shortcuts

### Global
- **Tab**: Move through interactive elements
- **Shift+Tab**: Move backwards
- **Enter**: Activate buttons/links
- **Escape**: Close dialogs/menus

### Filter Panel
- **Enter**: Apply filters (when in any input field)

### Data Table
- **Arrow Keys**: Navigate cells
- **Space**: Toggle row selection
- **Page Up/Down**: Scroll table vertically

### Pagination
- **Tab**: Navigate to page input
- **Enter**: Jump to typed page number

## Accessibility Features

- ✅ Keyboard navigation everywhere
- ✅ Screen reader support (ARIA labels)
- ✅ Focus indicators (2px navy outline)
- ✅ Skip-to-content link
- ✅ Semantic HTML
- ✅ High contrast colors

## Troubleshooting

### Issue: Port 5173 already in use
**Solution**: Kill the process or use a different port
```bash
kill -9 $(lsof -ti:5173)
# OR
npm run dev -- --port 3000
```

### Issue: Build fails with TypeScript errors
**Solution**: Clean and reinstall
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Settings/bookmarks not persisting
**Solution**: Check browser localStorage
```javascript
// Open browser console
localStorage.getItem('supplyManagementSettings')
localStorage.getItem('supplyManagementBookmarks')
```

### Issue: Table not loading data
**Solution**: Check console for errors, verify React Query
```bash
# Check browser console for errors
# Mock API has 1-second delay, wait for loading to complete
```

## File Locations

### Want to modify?
- **Colors/Theme**: `src/theme/theme.ts`
- **Mock Data**: `src/api/supplyApi.ts`
- **Filters**: `src/components/FilterPanel.tsx`
- **Table Columns**: `src/components/SupplyDataTable.tsx`
- **Main Layout**: `src/pages/SupplyDetailsDashboard.tsx`

### Want to add real API?
1. Replace functions in `src/api/supplyApi.ts`
2. Keep same function signatures
3. Update API endpoints
4. Add authentication headers
5. Handle API errors properly

Example:
```typescript
export const fetchSupplyData = async (
  filters: FilterState,
  page: number,
  pageSize: number,
  sortField?: string,
  sortDirection?: 'asc' | 'desc'
): Promise<SupplyDataResponse> => {
  const response = await axios.get('/api/v1/supply', {
    params: { ...filters, page, pageSize, sortField, sortDirection },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
```

## Production Deployment

### Build
```bash
npm run build
```

### Output
- `dist/` folder contains production build
- `dist/index.html` is the entry point
- `dist/assets/` contains bundled JS and CSS

### Deploy to:
- **Static hosting**: Upload `dist/` folder to Netlify, Vercel, AWS S3
- **Docker**: Create Dockerfile with nginx to serve static files
- **Node.js**: Use `serve` package to serve `dist/` folder

Example Dockerfile:
```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Support & Documentation

- **Full Specs**: See `/Users/naruechon/Documents/Project/Omnia/frontend/ai-prompts-ready-to-use.md`
- **Implementation Report**: See `IMPLEMENTATION_REPORT.md`
- **README**: See `README.md`
- **MUI Docs**: https://mui.com/
- **React Query Docs**: https://tanstack.com/query

## Next Steps

1. ✅ Test in multiple browsers
2. ✅ Integrate with real API
3. ✅ Add authentication
4. ✅ Implement dark theme
5. ✅ Add more user profile features
6. ✅ Implement column customization
7. ✅ Add export functionality
8. ✅ Write unit tests
9. ✅ Write E2E tests
10. ✅ Optimize bundle size

---

**Happy coding!** 🚀

For questions or issues, refer to the implementation report or component source code.
