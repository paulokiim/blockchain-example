interface UserSaveParams {
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface UserFindOneParams {
  username?: string;
  email?: string;
}

interface UserLoginParams extends UserFindOneParams {}
