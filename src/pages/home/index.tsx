import React from "react";
import { ConfigType } from "../../config";
import { User } from "../../util/types";
import './Home.css';
// import GoogleMap from "../../components/map";
// import { Place, MapView } from "../../components/map/util/types";
// import { getUserPosition } from "../../components/map/util";

type HomeProps = {
  context: ConfigType;
  user: User;
};

const Home: React.FC<HomeProps> = ({ context, user }) => {
  // TODO: the following is to be used once we set up Google Map API properly
  // const { defaultMapView, googleApiKey } = context;

  // const [mapView, setMapView] = useState<MapView>(defaultMapView);
  // const [geolocated, setGeolocated] = useState<boolean>(false);

  // const [places, setPlaces] = useState<Place[]>([]);
  // const [selectedPlace, setSelectedPlace] = useState<Place>();

  // if (!geolocated) {
  //   getUserPosition()
  //     .then(position => {
  //       const { latitude, longitude } = position.coords;
  //       setMapView({
  //         zoom: mapView.zoom,
  //         lat: latitude,
  //         lng: longitude
  //       });
  //     })
  //     .catch(console.log)
  //     .finally(() => {
  //       setGeolocated(true);
  //     });
  // }

  // const handleOnPlaceClick = (place: Place) => {
  //   setSelectedPlace(place);
  // };

  // const handleOnMapChange = (newMapView: MapView) => {
  //   setMapView({ ...newMapView });
  // };

  return (
    <div className="Home">
      <div className="wrapper">
        <div className="group-image image" />
        <div className="solo-image image" />
      </div>
    </div>

    // <GoogleMap
    //   apiKey={googleApiKey}
    //   mapView={mapView}
    //   defaultView={defaultMapView}
    //   places={places}
    //   selectedPlace={selectedPlace}
    //   handleOnPlaceClick={handleOnPlaceClick}
    //   onMapChange={handleOnMapChange}
    // />
  );
};

export default Home;
