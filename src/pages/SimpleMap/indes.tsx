import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const SimpleMap = (props: any) => {
  const [center, setCenter] = useState({ lat: 45.50503, lng: -73.573511 });
  const [zoom, setZoom] = useState(15);
  const [marker, setMarker] = useState(center);
  const [position, setPosition] = useState({});
  const [error, setError] = useState("");
  const onChange = ({ coords }: { coords: any }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {}, []);

  const _setMarker = ({ lat, lng }: { lat: number; lng: number }) => {
    setMarker({ lat: lat, lng: lng });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAZSDHMCOwasni6ozoypX_VLm4WmoXYndM" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={_setMarker}
      >
        <Marker
          lat={marker.lat}
          lng={marker.lng}
          name="My Marker"
          color="blue"
          draggable="true"
        />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
