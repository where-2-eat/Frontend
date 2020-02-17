import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import "./SimpleMap.css";
import { sendGroupLocation } from "../../util/requests";
import { ConfigType } from "../../config";
import { Error } from "../login";

type SimpleMapProps = {
  context: ConfigType;
};
export type Location = {
  lat: number;
  lng: number;
};

const SimpleMap: React.FC<SimpleMapProps> = ({ context }) => {
  const [center] = useState<Location>({
    lat: 45.50503,
    lng: -73.573511
  });
  const [zoom] = useState<number>(15);
  const [marker, setMarker] = useState<Location>(center);
  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ message: "", type: "" });

  const _setMarker = ({ lat, lng }: Location) => {
    setMarker({ lat: lat, lng: lng });
    setDisplayConfirm(true);
  };

  const handleConfirmClick = () => {
    sendGroupLocation(context, marker)
      .then(response => alert("Location successfully sent!"))
      .catch(err => {
        setError(err);
        alert("Could not send group location: " + err.message);
      });
  };
  return (
    <div className="map-wrapper">
      {displayConfirm && (
        <button className="confirm-btn" onClick={handleConfirmClick}>
          Confirm location
        </button>
      )}
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
