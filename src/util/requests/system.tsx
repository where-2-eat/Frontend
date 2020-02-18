import { asyncPostRequest, buildAuthHeader } from "./util";
import { ConfigType } from "../../config";

type DataGoogleApiKeyResponse = { googleApiKey: string };

function getGoogleApiKey({ server }: ConfigType): Promise<string> {
  return buildAuthHeader()
    .then(header =>
      asyncPostRequest<DataGoogleApiKeyResponse>(
        `${server}/googleApiKey`,
        {},
        header
      )
    )
    .then(data => {
      if (!data || !data.googleApiKey) throw new Error("No API Key returned.");
      return data.googleApiKey;
    });
}

export { getGoogleApiKey };
