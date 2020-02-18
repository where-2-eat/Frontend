import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RoomIcon from "@material-ui/icons/Room";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { IconType } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    red: {
      color: "#c0392b"
    },
    yellow: {
      color: "#f1c40f"
    },
    green: {
      color: "#2ecc71"
    }
  })
);

const Icon = ({ icon }: { icon: IconType }) => {
  const classes = useStyles();

  switch (icon) {
    case "user":
      return <FiberManualRecordIcon fontSize="small" color="primary" />;
    case "trash":
      return <DeleteIcon />;
    case "red":
      return (
        <RoomIcon fontSize="large" color="inherit" className={classes.red} />
      );
    case "yellow":
      return (
        <RoomIcon fontSize="large" color="inherit" className={classes.yellow} />
      );
    case "green":
      return (
        <RoomIcon fontSize="large" color="inherit" className={classes.green} />
      );
    default:
      return <RoomIcon fontSize="large" color="secondary" />;
  }
};

export { Icon };
