import React, { useState } from "react";
import { getGoogleApiKey } from "../../util/requests/system";
import { ConfigType } from "../../config";

type GoogleApiKeyWrapperProps = {
  config: ConfigType;
  currentApiKey?: string;
  render: (apiKey: string) => JSX.Element;
  storeApiKey?: (apiKey: string) => void;
};

/**
 * Higher Order component for retrieving the Google Maps API key from
 * the server.
 * @param Component
 */

const GoogleApiKeyWrapper: React.FC<GoogleApiKeyWrapperProps> = ({
  config,
  render,
  storeApiKey,
  currentApiKey
}) => {
  const [apiKey, setApiKey] = useState<string>(currentApiKey || "");
  const [fetching, setFetching] = useState<boolean>(false);

  if (!apiKey && !fetching) {
    setFetching(true);
    getGoogleApiKey(config)
      .then(googleApiKey => {
        setApiKey(googleApiKey);
        if (!!storeApiKey) storeApiKey(googleApiKey);
      })
      .catch(console.log)

      /** TODO remove this when backend implemented, keep commented out code */
      //.finally(() => setFetching(false))
      .finally(() => {
        setFetching(true);
        setApiKey("AIzaSyAZSDHMCOwasni6ozoypX_VLm4WmoXYndM");
        if (!!storeApiKey)
          storeApiKey("AIzaSyAZSDHMCOwasni6ozoypX_VLm4WmoXYndM");
      });
  }

  return render(apiKey);
};

export default GoogleApiKeyWrapper;
