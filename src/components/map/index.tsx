import React from "react";
import GoogleMapReact from "google-map-react";
import { Marker, MapView, LatLng } from "./util/types";
import { styles } from "./util/styles";
import MarkerIcon from "./marker/marker";
import "./Map.css";

type GoogleMapWrapperProps = {
  apiKey: string;

  mapView: MapView;
  defaultView: MapView;

  marker?: LatLng;
  markers: Marker[];
  selectedMarker: Marker | undefined;

  handleOnMarkerClick?: (marker: Marker) => void;
  onMapChange?: (location: MapView) => void;
  onMapClick?: (location: LatLng) => void;

  geolocation?: LatLng;
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
  marker,
  markers,
  selectedMarker,
  handleOnMarkerClick,
  onMapChange,
  onMapClick,
  geolocation
}) => {
  const { lat, lng, zoom } = mapView;

  const handleOnClick = (event: any) => {
    if (!!onMapClick) onMapClick(event);
  };

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

  const center: LatLng = selectedMarker ? { ...selectedMarker } : { lat, lng };

  return (
    <div className="map-wrapper">
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: apiKey }}
        options={{ styles, panControl: true }}
        /** Center & Zoom */
        defaultCenter={{ ...defaultView }}
        center={center}
        zoom={zoom}
        /** Handlers */
        onChange={handleOnChange}
        onClick={handleOnClick}
      >
        {!!geolocation && (
          <MarkerIcon
            key="user"
            lat={geolocation.lat}
            lng={geolocation.lng}
            icon="user"
          />
        )}

        {!!marker && (
          <MarkerIcon
            key={"marker"}
            lat={marker.lat}
            lng={marker.lng}
            icon={"user"}
            name="My Marker"
            color="blue"
            draggable={true}
          />
        )}

        {markers.map(marker => {
          const onMarkerClick = (): void => {
            if (!!handleOnMarkerClick) handleOnMarkerClick(marker);
          };

          return (
            <MarkerIcon
              key={marker.placeId}
              lat={marker.lat}
              lng={marker.lng}
              icon={marker.icon}
              handleOnClick={onMarkerClick}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapWrapper;
