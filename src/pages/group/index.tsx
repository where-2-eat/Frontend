import React, { useState, useEffect } from "react";
import { AppContext } from "../../util/types";
import { MapView, LatLng, Marker } from "../../components/map/util/types";
import GoogleMap from "../../components/map";
import { getUserPosition } from "../../components/map/util";
import { sendGroupLocation } from "../../util/requests/group";
import "./Group.css";

type SimpleMapProps = {
  context: AppContext;
  geolocation?: LatLng;
};

const SimpleMap: React.FC<SimpleMapProps> = ({ context }) => {
  const {
    config: { defaultMapView }
  } = context;

  const [mapView, setMapView] = useState<MapView>(defaultMapView);
  const [geolocated, setGeolocated] = useState<boolean>(false);
  const [geolocation, setGeolocation] = useState<LatLng>();

  const [marker, setMarker] = useState<LatLng>();
  const [selectedMarker, setSelectedMarker] = useState<Marker>();
  const [markers] = useState<Marker[]>([]);

  const [displayConfirm] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;

    const geolocate = () =>
      getUserPosition()
        .then(position => {
          const { latitude, longitude } = position.coords;
          if (!unmounted) {
            setMapView({
              zoom: mapView.zoom,
              lat: latitude,
              lng: longitude
            });
            setGeolocation({ lat: latitude, lng: longitude });
          }
        })
        .catch(console.log)
        .finally(() => {
          if (!unmounted) setGeolocated(true);
        });

    if (!geolocated) geolocate();
    return () => {
      unmounted = true;
    };
  }, [geolocated, mapView.zoom]);

  const handleOnMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  const handleOnMapChange = (newMapView: MapView) => {
    setMapView({ ...newMapView });
  };

  const handleOnMapClick = ({ lat, lng }: LatLng) => {
    setMarker({ lat, lng });
  };

  const handleConfirmClick = () => {
    if (!!marker)
      sendGroupLocation(context.config, marker)
        .then(response => alert("Location successfully sent!"))
        .catch(err => {
          alert("Could not send group location: " + err.message);
        });
  };

  if (!context.googleApiKey) {
    return (
      <div>
        <h2>No Google API Key provided.</h2>
      </div>
    );
  } else {
    return (
      <div className="map-wrapper">
        {displayConfirm && (
          <button className="confirm-btn" onClick={handleConfirmClick}>
            Confirm location
          </button>
        )}

        <GoogleMap
          apiKey={context.googleApiKey}
          mapView={mapView}
          defaultView={context.config.defaultMapView}
          marker={marker}
          markers={markers}
          selectedMarker={selectedMarker}
          handleOnMarkerClick={handleOnMarkerClick}
          onMapChange={handleOnMapChange}
          onMapClick={handleOnMapClick}
          geolocation={geolocation}
        />
      </div>
    );
  }
};

export default SimpleMap;
