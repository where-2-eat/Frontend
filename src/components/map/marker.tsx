import React from "react";
import { Icon } from "./util/icons";

type MarkerProps = {
  key: string;
  icon: string;
  handleOnClick: () => void;
};
const Marker = ({ icon, handleOnClick }: MarkerProps) => {
  return (
    <div onClick={handleOnClick}>
      <Icon icon={icon} />
    </div>
  );
};

export default Marker;
