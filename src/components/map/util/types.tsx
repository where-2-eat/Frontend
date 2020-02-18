export type LatLng = {
  lat: number;
  lng: number;
};

export type Marker = LatLng & {
  placeId: string;
  icon: IconType;
};

export type MapView = LatLng & {
  zoom: number;
};

export type IconType = "user" | "trash" | "red" | "yellow" | "green";
