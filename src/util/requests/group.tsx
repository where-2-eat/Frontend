import { asyncPostRequest } from "./util";
import { ConfigType } from "../../config";
import { LatLng } from "../../components/map/util/types";

function sendGroupLocation(
  { server }: ConfigType,
  { lat, lng }: LatLng
): Promise<LatLng> {
  if (!lat || !lng) throw new Error("Missing data.");
  return asyncPostRequest<LatLng>(`${server}/api/location`, {
    lat,
    lng
  }).then(location => {
    const { lat, lng } = location;
    if (!lat || !lng) throw new Error("Missing User Fields.");
    return location;
  });
}

export { sendGroupLocation };
