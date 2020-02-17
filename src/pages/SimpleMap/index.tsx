import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Maker";

const SimpleMap = (props: any) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState({ lat: 11.0168, lng: 76.9558 });
  const _setMarker = ({
    x,
    y,
    lat,
    lng,
    event
  }: {
    x: any;
    y: any;
    lat: any;
    lng: any;
    event: any;
  }) => {
    console.log(x, y, lat, lng, event);
    setMarker({lat: lat, lng: 76.9558});
  };

  const createMarker = () => {};

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAZSDHMCOwasni6ozoypX_VLm4WmoXYndM" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={_onClick}
      >
        <Marker
          lat={11.0168}
          lng={76.9558}
          name="My Marker"
          color="blue"
          draggable="true"
        />
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
