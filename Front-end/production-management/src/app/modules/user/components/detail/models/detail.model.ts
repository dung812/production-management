export interface SimplifiedUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  roles: string;
};

export interface UpdatedUserForm {
  name: string;
  email: string;
};