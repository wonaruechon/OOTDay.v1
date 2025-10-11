import React from 'react';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { SupplyDataItem } from '../types/supply';

interface SupplyDataTableProps {
  data: SupplyDataItem[];
  loading: boolean;
  error?: string;
  selectedRowIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc' | null) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

const SupplyDataTable: React.FC<SupplyDataTableProps> = ({
  data,
  loading,
  selectedRowIds,
  onSelectionChange,
  onSortChange,
  sortField,
  sortDirection,
}) => {
  const columns: GridColDef[] = [
    {
      field: 'locationId',
      headerName: 'Location ID',
      width: 150,
      sortable: true,
    },
    {
      field: 'itemId',
      headerName: 'Item ID',
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
      valueFormatter: (value: unknown) => {
        return new Intl.NumberFormat('en-US').format(value as number);
      },
    },
    {
      field: 'availableQuantity',
      headerName: 'Available Quantity',
      width: 170,
      align: 'right',
      headerAlign: 'right',
      sortable: true,
      valueFormatter: (value: unknown) => {
        return new Intl.NumberFormat('en-US').format(value as number);
      },
    },
    {
      field: 'supplyTypeId',
      headerName: 'Supply Type ID',
      width: 150,
      sortable: true,
    },
    {
      field: 'error',
      headerName: 'ERROR',
      width: 100,
      sortable: true,
      renderCell: (params) => (
        <span style={{ color: params.value ? '#D32F2F' : '#616161', fontWeight: params.value ? 500 : 400 }}>
          {params.value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      field: 'pendingReview',
      headerName: 'PENDING REVIEW',
      width: 150,
      sortable: true,
      renderCell: (params) => (
        <span style={{ color: params.value ? '#ED6C02' : '#616161', fontWeight: params.value ? 500 : 400 }}>
          {params.value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      field: 'infiniteSupply',
      headerName: 'Infinite Supply',
      width: 130,
      sortable: true,
      renderCell: (params) => (params.value ? 'Yes' : 'No'),
    },
    {
      field: 'kitSupply',
      headerName: 'Kit Supply',
      width: 110,
      sortable: true,
      renderCell: (params) => (params.value ? 'Yes' : 'No'),
    },
    {
      field: 'segment',
      headerName: 'Segment',
      width: 120,
      sortable: true,
    },
    {
      field: 'referenceType',
      headerName: 'Reference Type',
      width: 150,
      sortable: true,
    },
    {
      field: 'referenceId',
      headerName: 'Reference ID',
      width: 150,
      sortable: true,
    },
    {
      field: 'referenceDetailId',
      headerName: 'Reference Detail ID',
      width: 180,
      sortable: true,
    },
    {
      field: 'eta',
      headerName: 'ETA',
      width: 120,
      sortable: true,
      valueFormatter: (value: unknown) => {
        if (!value) return '';
        return value as string;
      },
    },
    {
      field: 'parentReferenceType',
      headerName: 'Parent Reference Type',
      width: 180,
      sortable: true,
    },
    {
      field: 'parentReferenceId',
      headerName: 'Parent Reference ID',
      width: 180,
      sortable: true,
    },
    {
      field: 'parentReferenceDetailId',
      headerName: 'Parent Reference Detail ID',
      width: 210,
      sortable: true,
    },
    {
      field: 'batchNumber',
      headerName: 'Batch Number',
      width: 150,
      sortable: true,
    },
    {
      field: 'countryOfOrigin',
      headerName: 'Country of Origin',
      width: 150,
      sortable: true,
    },
    {
      field: 'inventoryAttribute1',
      headerName: 'Inventory Attribute 1',
      width: 180,
      sortable: true,
    },
    {
      field: 'inventoryAttribute2',
      headerName: 'Inventory Attribute 2',
      width: 180,
      sortable: true,
    },
    {
      field: 'inventoryAttribute3',
      headerName: 'Inventory Attribute 3',
      width: 180,
      sortable: true,
    },
    {
      field: 'inventoryAttribute4',
      headerName: 'Inventory Attribute 4',
      width: 180,
      sortable: true,
    },
    {
      field: 'inventoryAttribute5',
      headerName: 'Inventory Attribute 5',
      width: 180,
      sortable: true,
    },
    {
      field: 'inventoryType',
      headerName: 'Inventory Type',
      width: 150,
      sortable: true,
    },
    {
      field: 'productStatus',
      headerName: 'Product Status',
      width: 150,
      sortable: true,
    },
  ];

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length > 0) {
      onSortChange(model[0].field, model[0].sort as 'asc' | 'desc');
    } else {
      onSortChange('', null);
    }
  };

  const sortModel: GridSortModel = sortField && sortDirection
    ? [{ field: sortField, sort: sortDirection }]
    : [];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={(ids) => onSelectionChange(ids as string[])}
        pageSizeOptions={[]}
        hideFooter
        rowHeight={52}
        columnHeaderHeight={56}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E0E0E0',
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 500,
              fontSize: '14px',
              color: '#212121',
            },
          },
          '& .MuiDataGrid-row': {
            '&:nth-of-type(even)': {
              backgroundColor: '#F5F5F5',
            },
            '&:hover': {
              backgroundColor: '#E3F2FD !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#BBDEFB !important',
              '&:hover': {
                backgroundColor: '#90CAF9 !important',
              },
            },
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            color: '#212121',
            padding: '0 16px',
          },
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'auto',
          },
          '& .MuiCheckbox-root': {
            color: '#616161',
            '&.Mui-checked': {
              color: '#1B3A57',
            },
          },
          '& .MuiDataGrid-overlayWrapper': {
            minHeight: '400px',
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#616161',
              }}
            >
              <InboxIcon sx={{ fontSize: 64, marginBottom: 2, opacity: 0.5 }} />
              <span style={{ fontSize: '16px' }}>No data to display</span>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default SupplyDataTable;
