export interface SimplifiedCurrentUser {
  name: string;
  email: string;
  role: string;
  isFirstLogin: boolean
};

export interface User {
  id: string;
  name: string;
  userName: string;
  roles: string;
  email: string;
  createdDate: string;
  updatedDate: string;
}

export interface UserForm {
    id: string;
    name: string;
    userName: string;
    roles: string;
    email: string;
}

export interface UserPaginatedQuery {
  searchString?: string | null;
  limit: number;
  page: number;
  sortColumn: string | null;
  sortOrder: string | null;
  role: string| null;
}


// export interface UserPaginatedQuery {
//   searchString?: string | null;
//   limit: number;
//   page: number;
//   sortColumn?: string | null;
//   sortOrder?: SORT_ORDER_TYPE | null;
//   role?: string| null;
// }
