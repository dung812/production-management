export interface SimplifiedUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  roles: string;
};

export interface UserDetailRes {
  id: string;
  name: string;
  userName: string;
  roles: string;
  isDisabled: boolean;
  email: string;
  createdDate: string;
  updatedDate: string;
}
