export interface Place {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
}

export type MapView = {
  lat: number;
  lng: number;
  zoom: number;
};
