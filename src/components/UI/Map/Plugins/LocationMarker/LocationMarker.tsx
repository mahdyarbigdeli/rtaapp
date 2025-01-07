import { useState } from "react";
import {
  Circle,
  FeatureGroup,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { ICordination, IMapModeSingle } from "../../types/Map.type";

import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import MarkerIcon from "../../Icons/MarkerIcon";
import styles from "./styles.module.scss";

export default function LocationMarker({
  events,
  intialPositions,
  selectCount,
  mode,
}: IMapModeSingle) {
  // Event
  const { onSelectLocations = () => {} } = events;

  const [locations, setLocations] = useState<ICordination[]>(intialPositions);

  const [radius] = useState(50);

  function OnClickHandler({}: any) {
    useMapEvents({
      click: ({ latlng }: any) => {
        const newLocation = locations;
        if (mode === "show") return;
        if (selectCount === newLocation.length) newLocation.pop();
        newLocation.push({
          ...latlng,
          lon: latlng.lng,
        });
        setLocations(() => [...newLocation]);
        onSelectLocations(newLocation);
      },
    });
    return true;
  }

  const svgIcon = L.divIcon({
    html: renderToStaticMarkup(<MarkerIcon />),
    className: "svg-icon",
    iconSize: [0, 0],
    iconAnchor: [25, 25],
  });

  return (
    <div className={styles.locationMarker}>
      {locations.map((cordinate, index) => (
        <FeatureGroup
          key={index}
          pathOptions={{
            color: "red",
          }}>
          <Popup>{cordinate.title || `موقعیت : ${index}`}</Popup>
          <Circle
            center={cordinate}
            radius={radius}
          />
          <Marker
            position={cordinate}
            icon={svgIcon}
          />
        </FeatureGroup>
      ))}
      <OnClickHandler />
    </div>
  );
}
