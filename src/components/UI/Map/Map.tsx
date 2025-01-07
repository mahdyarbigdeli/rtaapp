import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-geosearch/dist/geosearch.css";

interface MapType {
  defaultLocation: {
    lat: number;
    lng: number;
  };
  children?: JSX.Element | JSX.Element[];
  className?: string;
  zoom?: number;
  scrollWheelZoom?: boolean;
}

export default function Map({
  defaultLocation,
  children,
  className,
  zoom = 13,
  scrollWheelZoom = true,
}: MapType) {
  const [position, setPosition] = useState<LatLngExpression>({
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
  });

  return (
    <MapContainer
      className={`${styles.map} ${className}`}
      center={position}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children}
    </MapContainer>
  );
}
