import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Maker";

const SimpleMap = (props: any) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState({ lat: 11.0168, lng: 76.9558 });
  const [position, setPosition] = useState({});
  const [error, setError] = useState('');

    const onChange = ({coords}: {coords: any}) => {
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };
    
    const onError = (error: any) => {
      setError(error.message);
    };

    useEffect(() => {
      
    }, []);

  const _setMarker = ({ lat, lng  }: { lat: number; lng: number; }) => {
    setMarker({lat: lat, lng: lng});
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
