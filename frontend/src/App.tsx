import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { ClusterMarkers } from "./components/ClusterMarker";
import trees from "./data/trees";
import { env } from "./env";
import { Directions } from "./components/Directions";

export default function App() {
  const position: google.maps.LatLng | google.maps.LatLngLiteral = {
    lat: 53.54,
    lng: 2,
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-full">
      <APIProvider apiKey={env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          zoom={9}
          center={position}
          mapId={env.VITE_GOOGLE_MAP_ID}
          fullscreenControl={false}
        >
          <Directions />
          <AdvancedMarker position={{ lat: 55.54, lng: 2.5 }}></AdvancedMarker>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background="gray"
              borderColor="green"
              glyphColor="purple"
              scale={2}
            />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'am a message</p>
            </InfoWindow>
          )}
          {/* <Markers points={trees} /> */}
          <ClusterMarkers points={trees} />
        </Map>
      </APIProvider>
    </div>
  );
}
