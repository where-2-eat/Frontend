export type ConfigType = {
  server: string;
  defaultMapView: {
    lat: number;
    lng: number;
    zoom: number;
  };
};

/**
 * Computes the environment the web is running in.
 *
 * (Note: contrary to running on a Node JS environment, where process.env
 * is available, the web app is running on a broswer and does not have
 * access to such environment variables.)
 */
function computeEnv() {
  const url = window.location.href;
  if (url.includes("localhost")) {
    return "development";
  } else if (url.includes("heroku")) {
    return "production";
  } else {
    return "";
  }
}

function Config(): ConfigType {
  const ENV = computeEnv();

  switch (ENV) {
    case "development":
      return {
        server: "http://localhost:8081",
        defaultMapView: {
          lat: 45.5017,
          lng: -73.5673,
          zoom: 14
        }
      };

    case "production":
      return {
        server: "",
        defaultMapView: {
          lat: 45.5017,
          lng: -73.5673,
          zoom: 14
        }
      };

    default:
      return {
        server: "",
        defaultMapView: {
          lat: 0,
          lng: 0,
          zoom: 0
        }
      };
  }
}

export default Config;
