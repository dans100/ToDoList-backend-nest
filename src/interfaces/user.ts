export interface UserEntity {
  id: string;
  username: string;
  password: string;
  email: string;
}

export type RegisterUserResponse = {
  message: string;
};
