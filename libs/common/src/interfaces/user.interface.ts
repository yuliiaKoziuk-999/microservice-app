export interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser extends Pick<IUser, 'id' | 'email' | 'name'> {
  roles: string[];
}
