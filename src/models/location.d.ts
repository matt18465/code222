export interface Location {
  id: string;
  position: { lat: number; lng: number };
  imageURL: string;
  kW: number;
  kWp: number;
  title: string;
  PR: number;
}
