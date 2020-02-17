export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  signUpDate: string;

  jwt: string;
};

export type ApiResponse<T> = {
  status: number;
  message: "success" | "failure";
  error?: string;
  data?: T;
};

export type LoginOrSignUp = "login" | "signup";
