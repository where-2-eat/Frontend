import request from "request";
import { User, ApiResponse } from "./types";
import { ConfigType } from "../config";

type UserAuthenticate = {
  email: string;
  password: string;
};

type UserCreate = UserAuthenticate & {
  firstName: string;
  lastName: string;
};

function tryReAuthenticating({ server }: ConfigType): Promise<User> {
  const jwt = localStorage.getItem("token");
  if (!jwt) return Promise.reject("No Token Available");

  return asyncPostRequest<User>(`${server}/reauthenticate`, { jwt })
    .then(user => {
      const { email, password, jwt } = user;
      if (!email || !password || !jwt) throw new Error("Missing User Fields.");
      return user;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt);
      return user;
    });
}

function authenticate(
  { server }: ConfigType,
  credentials: UserAuthenticate
): Promise<User> {
  return asyncPostRequest<User>(`${server}/authenticate`, credentials)
    .then(user => {
      const { email, password, jwt } = user;
      if (!email || !password || !jwt) throw new Error("Missing User Fields.");
      return user;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt);
      return user;
    });
}

function createUser({ server }: ConfigType, user: UserCreate): Promise<User> {
  return asyncPostRequest<User>(`${server}/createuser`, user)
    .then(user => {
      const { email, firstName, lastName, jwt } = user;
      if (!email || !firstName || !lastName || !jwt) throw new Error("Missing User Fields.");
      return user;
    })
    .then(user => {
      localStorage.setItem("token", user.jwt);
      return user;
    });
}

/**
 * HTTP POST request given a JSON body and url
 * @param url
 * @param body
 * @param statusCodes
 */
function asyncPostRequest<T>(
  url: string,
  body: any,
  statusCodes?: number[]
): Promise<T> {
  return new Promise<T>(function(resolve, reject) {
    request.post(url, { json: body }, function(error, response, body) {
      /** Validate HTTP Request Response */
      if (!!error) {
        reject(error);
      } else if (
        !response ||
        (!!statusCodes && statusCodes.includes(response.statusCode))
      ) {
        reject(`Error Status Code: ${response.statusCode}`);
      } else if (!body) {
        reject(`No Body in Response`);
      } else {
        /** Validate API Response */
        const { status, message, error, data }: ApiResponse<T> = body;

        if (!!error) {
          reject(error);
        } else if (status !== 200 || message === "failure") {
          reject(`Internal Error: status ${status}`);
        } else {
          resolve(data);
        }
      }
    });
  });
}

export { authenticate, createUser, tryReAuthenticating };
