import { FilterState, SupplyDataItem, SupplyDataResponse } from '../types/supply';

// Generate mock supply data
const generateMockData = (count: number): SupplyDataItem[] => {
  const mockData: SupplyDataItem[] = [];
  const locations = ['LOC001', 'LOC002', 'LOC003', 'LOC004', 'LOC005'];
  const items = ['ITEM-A001', 'ITEM-B002', 'ITEM-C003', 'ITEM-D004', 'ITEM-E005'];
  const supplyTypes = ['PHYSICAL', 'VIRTUAL', 'CONSIGNMENT', 'DROP-SHIP'];
  const segments = ['SEG-A', 'SEG-B', 'SEG-C', 'SEG-D'];
  const referenceTypes = ['PO', 'TO', 'SO', 'RMA'];
  const inventoryTypes = ['AVAILABLE', 'RESERVED', 'DAMAGED', 'IN_TRANSIT'];
  const productStatuses = ['ACTIVE', 'DISCONTINUED', 'OBSOLETE'];

  for (let i = 0; i < count; i++) {
    mockData.push({
      id: `supply-${i + 1}`,
      locationId: locations[Math.floor(Math.random() * locations.length)],
      itemId: items[Math.floor(Math.random() * items.length)],
      quantity: Math.floor(Math.random() * 10000) + 100,
      availableQuantity: Math.floor(Math.random() * 8000) + 50,
      supplyTypeId: supplyTypes[Math.floor(Math.random() * supplyTypes.length)],
      error: Math.random() < 0.15, // 15% have errors
      pendingReview: Math.random() < 0.25, // 25% pending review
      infiniteSupply: Math.random() < 0.1,
      kitSupply: Math.random() < 0.2,
      segment: segments[Math.floor(Math.random() * segments.length)],
      referenceType: referenceTypes[Math.floor(Math.random() * referenceTypes.length)],
      referenceId: `REF-${Math.floor(Math.random() * 100000)}`,
      referenceDetailId: `DET-${Math.floor(Math.random() * 100000)}`,
      eta: Math.random() < 0.7 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      parentReferenceType: referenceTypes[Math.floor(Math.random() * referenceTypes.length)],
      parentReferenceId: `PREF-${Math.floor(Math.random() * 100000)}`,
      parentReferenceDetailId: `PDET-${Math.floor(Math.random() * 100000)}`,
      batchNumber: `BATCH-${Math.floor(Math.random() * 10000)}`,
      countryOfOrigin: ['TH', 'CN', 'US', 'JP', 'DE'][Math.floor(Math.random() * 5)],
      inventoryAttribute1: `ATTR1-${Math.floor(Math.random() * 100)}`,
      inventoryAttribute2: `ATTR2-${Math.floor(Math.random() * 100)}`,
      inventoryAttribute3: `ATTR3-${Math.floor(Math.random() * 100)}`,
      inventoryAttribute4: `ATTR4-${Math.floor(Math.random() * 100)}`,
      inventoryAttribute5: `ATTR5-${Math.floor(Math.random() * 100)}`,
      inventoryType: inventoryTypes[Math.floor(Math.random() * inventoryTypes.length)],
      productStatus: productStatuses[Math.floor(Math.random() * productStatuses.length)],
    });
  }
  return mockData;
};

// Cache the generated data to maintain consistency
let cachedData: SupplyDataItem[] | null = null;

const getAllMockData = (): SupplyDataItem[] => {
  if (!cachedData) {
    cachedData = generateMockData(8165); // Total records as per spec
  }
  return cachedData;
};

// Filter data based on filter state
const applyFilters = (data: SupplyDataItem[], filters: FilterState): SupplyDataItem[] => {
  return data.filter((item) => {
    if (filters.locationId && !item.locationId.toLowerCase().includes(filters.locationId.toLowerCase())) {
      return false;
    }
    if (filters.itemId && !item.itemId.toLowerCase().includes(filters.itemId.toLowerCase())) {
      return false;
    }
    if (filters.supplyTypeId && !item.supplyTypeId.toLowerCase().includes(filters.supplyTypeId.toLowerCase())) {
      return false;
    }
    if (filters.includeErrored === 'yes' && !item.error) {
      return false;
    }
    if (filters.includeErrored === 'no' && item.error) {
      return false;
    }
    if (filters.displayPendingReview === 'yes' && !item.pendingReview) {
      return false;
    }
    if (filters.displayPendingReview === 'no' && item.pendingReview) {
      return false;
    }
    // Advanced filters
    if (filters.segment && !item.segment.toLowerCase().includes(filters.segment.toLowerCase())) {
      return false;
    }
    if (filters.referenceType && !item.referenceType.toLowerCase().includes(filters.referenceType.toLowerCase())) {
      return false;
    }
    if (filters.referenceId && !item.referenceId.toLowerCase().includes(filters.referenceId.toLowerCase())) {
      return false;
    }
    if (filters.batchNumber && !item.batchNumber.toLowerCase().includes(filters.batchNumber.toLowerCase())) {
      return false;
    }
    if (filters.countryOfOrigin && !item.countryOfOrigin.toLowerCase().includes(filters.countryOfOrigin.toLowerCase())) {
      return false;
    }
    if (filters.inventoryType && !item.inventoryType.toLowerCase().includes(filters.inventoryType.toLowerCase())) {
      return false;
    }
    if (filters.productStatus && !item.productStatus.toLowerCase().includes(filters.productStatus.toLowerCase())) {
      return false;
    }
    return true;
  });
};

// Sort data
const sortData = (data: SupplyDataItem[], sortField?: string, sortDirection?: 'asc' | 'desc'): SupplyDataItem[] => {
  if (!sortField || !sortDirection) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = a[sortField as keyof SupplyDataItem];
    const bValue = b[sortField as keyof SupplyDataItem];

    if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue);
    const bStr = String(bValue);
    return sortDirection === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
};

// Fetch supply data (mock API call with delay)
export const fetchSupplyData = async (
  filters: FilterState,
  page: number,
  pageSize: number,
  sortField?: string,
  sortDirection?: 'asc' | 'desc'
): Promise<SupplyDataResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const allData = getAllMockData();
  const filteredData = applyFilters(allData, filters);
  const sortedData = sortData(filteredData, sortField, sortDirection);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount: filteredData.length,
    page,
    pageSize,
  };
};

// Reset error status for selected items (mock)
export const resetErrorStatus = async (itemIds: string[]): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Update cached data
  if (cachedData) {
    cachedData = cachedData.map(item =>
      itemIds.includes(item.id) ? { ...item, error: false } : item
    );
  }

  console.log('Reset error status for items:', itemIds);
  return { success: true };
};
