import React from "react";
import { Icon } from "../util/icons";
import { Box } from "@material-ui/core";
import { IconType } from "../util/types";
import "./Marker.css";

type MarkerProps = {
  key: string;
  lat: number;
  lng: number;
  icon: IconType;
  handleOnClick?: () => void;

  color?: string;
  name?: string;
  draggable?: boolean;
};
const Marker = ({ icon, handleOnClick, color, name }: MarkerProps) => {
  if (!!color) {
    return (
      <div className="marker">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: "pointer" }}
          title={name}
        />
        <div className="pulse" />
      </div>
    );
  } else {
    return (
      <Box onClick={handleOnClick}>
        <Icon icon={icon} />
      </Box>
    );
  }
};

export default Marker;
