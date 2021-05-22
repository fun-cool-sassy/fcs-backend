import { Location } from "@fcs/entity";

function distance(location1: Location, location2: Location): number {
  const { latitude: lat1, longitude: lon1 } = location1;
  const { latitude: lat2, longitude: lon2 } = location2;
  const degToRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371;
  const halfDLat = degToRad(lat2 - lat1) / 2;
  const halfDLon = degToRad(lon2 - lon1) / 2;
  const a =
    Math.sin(halfDLat) * Math.sin(halfDLat) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(halfDLon) *
      Math.sin(halfDLon);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default distance;
