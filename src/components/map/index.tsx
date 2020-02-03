import React from "react";
import GoogleMapReact from "google-map-react";
import { Place, MapView } from "./util/types";
import { styles } from "./util/styles";
import Marker from "./marker";

type GoogleMapWrapperProps = {
  apiKey: string;

  mapView: MapView;
  defaultView: MapView;

  places: Place[];
  selectedPlace: Place | undefined;

  handleOnPlaceClick?: (place: Place) => void;
  onMapChange?: (location: MapView) => void;
};

/**
 * A wrapper around the Google Maps API. A valid Google Maps API key must
 * be provided. (link: https://console.cloud.google.com/)
 *
 * Allows you to center and zoom map through the mapView prop, which provides
 * lat, lng, zoom fields. Also allows you to populate the map with markers
 * given places with coordinates. Also gives you an API for when the Map is
 * changed (moved, zoom change) or when a marker is clicked.
 * @param GoogleMapWrapperProps
 */
const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  apiKey,
  mapView,
  defaultView,
  places,
  selectedPlace,
  handleOnPlaceClick,
  onMapChange
}) => {
  const { lat, lng, zoom } = mapView;

  const handleOnChange = (event: any) => {
    if (!!event && !!event.center && !!event.zoom) {
      const {
        center: { lat, lng },
        zoom
      } = event;
      if (!!onMapChange) onMapChange({ lat, lng, zoom });
    }
  };

  if (!apiKey) {
    return (
      <div>
        <h1>No Google API key provided</h1>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: apiKey }}
        options={{ styles }}
        /** Center & Zoom */
        defaultCenter={{ ...defaultView }}
        defaultZoom={defaultView.zoom}
        center={{ lat, lng }}
        zoom={zoom}
        /** Handlers */
        onChange={handleOnChange}

        /** TODO - info windows ??? */
        /** TODO - selectedPlace ??? */
      >
        {places.map(place => {
          const handleOnMarkerClick = (): void => {
            if (!!handleOnPlaceClick) handleOnPlaceClick(place);
          };

          return (
            <Marker
              key={place.placeId}
              icon={"icon"}
              handleOnClick={handleOnMarkerClick}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapWrapper;
