export interface FilterState {
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

export interface SupplyDataItem {
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
  eta: string | null;
  parentReferenceType: string;
  parentReferenceId: string;
  parentReferenceDetailId: string;
  batchNumber: string;
  countryOfOrigin: string;
  inventoryAttribute1: string;
  inventoryAttribute2: string;
  inventoryAttribute3: string;
  inventoryAttribute4: string;
  inventoryAttribute5: string;
  inventoryType: string;
  productStatus: string;
}

export interface SupplyDataResponse {
  data: SupplyDataItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface UserSettings {
  defaultPageSize: 10 | 25 | 50 | 100;
  defaultView: string;
  language: 'thai' | 'english';
}

export interface Bookmark {
  id: string;
  name: string;
  filters: FilterState;
  isDefault?: boolean;
  createdAt: string;
}
