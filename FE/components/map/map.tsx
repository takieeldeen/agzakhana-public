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
  useMap,
} from "react-leaflet";
import { ReactNode, useEffect } from "react";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
  iconUrl: markerIcon.src ?? markerIcon,
  shadowUrl: markerShadow.src ?? markerShadow,
});

type MapMarkerProps = { children?: ReactNode } & Omit<MarkerProps, "">;
export function MapMarker({ children, ...other }: MapMarkerProps) {
  return (
    <Marker {...other} position={other?.position ?? [30.0444762, 31.2357545]}>
      {children}
    </Marker>
  );
}

function FlyToLocation({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 2 }); // 2 seconds smooth transition
    }
  }, [map, position]);

  return null;
}

type MapProps = {
  children?: ReactNode;
  smooth?: boolean;
  markers?: { position: [number, number] }[];
} & MapContainerProps;
export default function Map({
  children,
  markers,
  smooth = false,
  ...other
}: MapProps) {
  return (
    <MapContainer
      center={other?.center ?? [30.0444762, 31.2357545]}
      zoom={12}
      style={{
        height: "100%",
        width: "100%",
        ...(other?.style ?? {}),
        zIndex: 1,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" /> */}
      {smooth && <FlyToLocation position={other?.center as any} />}
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
