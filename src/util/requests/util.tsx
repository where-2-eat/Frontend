import request from "request";
import { ApiResponse } from "../types";

interface ObjectMap {
  [key: string]: string;
}

export interface AuthHeader extends ObjectMap {
  Authorization: string /* Bearer <token> */;
}

/**
 * Builds a request header with the cached JWT.
 */
function buildAuthHeader(): Promise<AuthHeader> {
  const jwt = localStorage.getItem("token");
  if (!jwt) return Promise.reject("No Token Available");
  return Promise.resolve({ Authorization: `Bearer ${jwt}` });
}

function asyncGetRequest<T>(
  url: string,
  params: ObjectMap,
  headers?: ObjectMap,
  statusCodes?: number[]
): Promise<T> {
  return new Promise<T>(function(resolve, reject) {
    let urlParams = "";
    if (!!params && Object.keys(params).length > 0) {
      urlParams = Object.keys(params).reduce((result, key, index) => {
        let param = `${key}=${params[key]}`;

        if (index < Object.keys(params).length - 1) return `${result}${param}&`;
        else return `${result}${param}`;
      }, "?");
    }

    request.get(`${url}${urlParams}`, { headers }, function(
      error,
      response,
      body
    ) {
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

/**
 * HTTP POST request given a JSON body and url
 * @param url
 * @param body
 * @param statusCodes
 */
function asyncPostRequest<T>(
  url: string,
  body: any,
  headers?: ObjectMap,
  statusCodes?: number[]
): Promise<T> {
  return new Promise<T>(function(resolve, reject) {
    request.post(url, { headers, json: body }, function(error, response, body) {
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

export { buildAuthHeader, asyncPostRequest, asyncGetRequest };
