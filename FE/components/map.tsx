import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  MarkerProps,
  TileLayer,
} from "react-leaflet";
import { ReactNode } from "react";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
  iconUrl: markerIcon.src ?? markerIcon,
  shadowUrl: markerShadow.src ?? markerShadow,
});

type MapProps = {
  children?: ReactNode;
  markers?: { position: [number, number] }[];
} & MapContainerProps;
export default function Map({ children, markers, ...other }: MapProps) {
  return (
    <MapContainer
      center={other?.center ?? [30.0444762, 31.2357545]}
      zoom={12}
      style={{ height: "100%", width: "100%", ...(other?.style ?? {}) }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
      {!!markers &&
        markers?.map((marker) => (
          <MapMarker
            position={marker?.position}
            key={JSON.stringify(marker?.position)}
          />
        ))}
    </MapContainer>
  );
}

type MapMarkerProps = { children?: ReactNode } & MarkerProps;
export function MapMarker({ children, ...other }: MapMarkerProps) {
  return (
    <Marker position={other?.position ?? [30.0444762, 31.2357545]}>
      {children}
    </Marker>
  );
}
