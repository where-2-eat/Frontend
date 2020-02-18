import { ConfigType } from "../../config";
import { SystemUser_, Login_ } from "../models";
import { asyncPostRequest } from "./util";

type DataUserResponse = { systemUser: SystemUser_ };

function tryReAuthenticating({ server }: ConfigType): Promise<SystemUser_> {
  const jwt = localStorage.getItem("token");
  if (!jwt) return Promise.reject("No Token Available");

  return asyncPostRequest<DataUserResponse>(`${server}/reauthenticate`, { jwt })
    .then(data => {
      if (!data || !data.systemUser) throw new Error("No User data returned.");

      const { userId, firstName, lastName, jwt } = data.systemUser;
      if (!userId || !firstName || !lastName || !jwt)
        throw new Error("Missing User Fields.");
      return data.systemUser;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt || "");
      return user;
    });
}

function authenticate(
  { server }: ConfigType,
  credentials: Login_
): Promise<SystemUser_> {
  return asyncPostRequest<DataUserResponse>(
    `${server}/authenticate`,
    credentials
  )
    .then(data => {
      if (!data || !data.systemUser) throw new Error("No User data returned.");

      const { userId, firstName, lastName, jwt } = data.systemUser;
      if (!userId || !firstName || !lastName || !jwt)
        throw new Error("Missing User Fields.");
      return data.systemUser;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt || "");
      return user;
    });
}

function createUser(
  { server }: ConfigType,
  user: SystemUser_
): Promise<SystemUser_> {
  return asyncPostRequest<DataUserResponse>(`${server}/createuser`, user)
    .then(data => {
      if (!data || !data.systemUser) throw new Error("No User data returned.");

      const { userId, firstName, lastName, jwt } = data.systemUser;
      if (!userId || !firstName || !lastName || !jwt)
        throw new Error("Missing User Fields.");
      return data.systemUser;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt || "");
      return user;
    });
}

export { authenticate, createUser, tryReAuthenticating };
