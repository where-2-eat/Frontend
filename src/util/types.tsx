import { ConfigType } from "../config";
import { SystemUser_ } from "./models";

export type AppContext = {
  config: ConfigType;
  user: SystemUser_;
  googleApiKey: string;
};

export type ApiResponse<T> = {
  status: number;
  message: "success" | "failure";
  error?: string;
  data?: T;
};

export type FormError<T> = {
  message: string;
  type: T;
};
