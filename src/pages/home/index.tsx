import React, { useState } from "react";
import GoogleMap from "../../components/map";
import { Place, MapView } from "../../components/map/util/types";
import { getUserPosition } from "../../components/map/util";
import { ConfigType } from "../../config";
import { User } from "../../util/types";

type HomeProps = {
  context: ConfigType;
  user: User;
  handleOnLogout: () => void;
};

const Home: React.FC<HomeProps> = ({ context, user, handleOnLogout }) => {
  const { defaultMapView, googleApiKey } = context;

  const [mapView, setMapView] = useState<MapView>(defaultMapView);
  const [geolocated, setGeolocated] = useState<boolean>(false);

  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  if (!geolocated) {
    getUserPosition()
      .then(position => {
        const { latitude, longitude } = position.coords;
        setMapView({
          zoom: mapView.zoom,
          lat: latitude,
          lng: longitude
        });
      })
      .catch(console.log)
      .finally(() => {
        setGeolocated(true);
      });
  }

  const handleOnPlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleOnMapChange = (newMapView: MapView) => {
    setMapView({ ...newMapView });
  };

  return (
    <GoogleMap
      apiKey={googleApiKey}
      mapView={mapView}
      defaultView={defaultMapView}
      places={places}
      selectedPlace={selectedPlace}
      handleOnPlaceClick={handleOnPlaceClick}
      onMapChange={handleOnMapChange}
    />
  );
};

export default Home;
