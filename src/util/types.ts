export type UserData = {
  _id: string;
  username: string;
  email: string;
  _email: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  image: string;
  thumbnail: string;
  role: string;
  stateOfOrigin: string;
  localGovtOfOrigin: string;
  stateOfResidence: string;
  localGovtOfResidence: string;
  learningPath: string[];
  totalPointsEarned: number;
  enrolledCourses: number;
  completedCourses: number;
  createdAt: string;
  updatedAt: string;
  officerType: string;
  officerData: {
    language: string;
    complementSkill: string;
    technicalCapability: string;
  };
};

export type UserList = UserData[];
