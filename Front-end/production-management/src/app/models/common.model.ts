export interface PaginatedModel<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface Breadcrumb {
  middleItems:
      | {
            label: string;
            link: string;
        }[]
      | null;
  lastItem: string;
}


abstract class BaseQueryCriteria {
  searchString: string | null = null;
  limit: number = 10;
  page: number = 1;
  SortOrder: SORT_ORDER_TYPE = SORT_ORDER_TYPE.Ascending;
  SortColumn: string | null = null;
}


export enum SORT_ORDER_TYPE {
  Ascending = 0,
  Descending = 1
}
