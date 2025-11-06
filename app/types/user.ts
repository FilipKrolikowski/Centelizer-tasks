export type User = {
  id: number;
  email: string;
  gender: string;
  name: string;
  status: string;
};

export type EditUserInputs = {
  name: string;
  email: string;
  status: string;
};

export type AddUserInputs = {
  name: string;
  email: string;
  status: string;
  gender: string;
};
