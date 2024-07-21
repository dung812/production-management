abstract class BaseQueryCriteria {
  searchString: string | null = null;
  limit: number = 10;
  page: number = 1;
  SortOrder: SORT_ORDER_TYPE = SORT_ORDER_TYPE.Ascending;
  SortColumn: string | null = null;
}


enum SORT_ORDER_TYPE {
  Ascending = 0,
  Descending = 1
}


export class UserQueryCriteria extends BaseQueryCriteria {
  role: string | null = null;
  constructor() {
    super();
  }
}
