export type UserData = {
  email: string;
  phone: string;
  image: string;
  thumbnail: string;
  firstName: string;
  lastName: string;
  stateOfOrigin: string;
  localGovtOfOrigin: string;
  stateOfResidence: string;
  localGovtOfResidence: string;
  address: string;
  role: string;
  isEmailVerified: boolean;
  hasPasswordChanged: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type UserList = UserData[];
