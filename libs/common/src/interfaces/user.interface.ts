export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser extends Pick<
  IUser,
  'id' | 'email' | 'firstName' | 'lastName'
> {
  roles: string[];
}
