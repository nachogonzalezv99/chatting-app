import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: Point[] };

export function Markers({ points }: Props) {
  return (
    <>
      {points.map((point) => (
        <AdvancedMarker key={point.key} position={point}>
          <span>🌲</span>
        </AdvancedMarker>
      ))}
    </>
  );
}

export function ClusterMarkers({ points }: Props) {
  const map = useMap();
  const [markers, setMarkers] = useState<Record<string, Marker>>({});
  const clusterer = useRef<MarkerClusterer | null>();

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map, clusterer]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers, clusterer]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          key={point.key}
          position={point}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <span>🌲</span>
        </AdvancedMarker>
      ))}
    </>
  );
}
