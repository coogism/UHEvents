import "../App.css"
import "./css/map.css"

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, useMapEvents, useMap } from 'react-leaflet'

import features from "../jsons/features.json"

import React, { createRef, useEffect, useState } from "react";

import L from "leaflet"

const district_colors = {
  Central: "#EDAA00",
  Health: "#CA006C",
  "Technology Bridge": "#6D8D24",
  Athletics: "#CC0B2A",
  Arts: "#00837E",
  Professional: "#407CCA",
  "Cullen North": "#AB8367",
  Residential: "#712177",
}

const setColor = ({ properties }) => {
  return {
    color: district_colors[properties.district],
    weight: 1,
    opacity: 1,
  };
};

const centerPts = []

features.features.forEach(feature => {
  if (feature.geometry.type === "Polygon" && feature.properties.label !== undefined && feature.properties.district !== "Residential") {
    // console.log(feature.geometry.coordinates)
    const bounds = L.latLngBounds(feature.geometry.coordinates)

    // console.log(bounds.getCenter())

    centerPts.push([bounds.getCenter(), feature.properties])
  }
})

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

const defaultState = {
  lat: 29.721150,
  lng: -95.35157,
  zoom: 15.5,
}

const position = [defaultState.lat, defaultState.lng];

export default function UHMap({ targetLocation }) {
  const mapRef = createRef()

  const key = 'NlqVQVaYotWw1C9mjheO';
  const url = `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${key}`

  const [marker, setMarker] = useState([])

  const [Zoom, setZoom] = useState(defaultState.zoom);

  console.log(Zoom);

  const MapEvents = () => {
    const map = useMap()
    useMapEvents({
      zoomend() { // zoom event (when zoom animation ended)
        const zoom = map.getZoom(); // get current Zoom of map
        setZoom(zoom);
      },
    });
    return false;
  };

  useEffect(() => {
    const map = mapRef.current
    if (map) {
      if (targetLocation) {
        setMarker([
          {
            lng: targetLocation.location[0],
            lat: targetLocation.location[1]
          }
        ])
        map.flyTo([Number(targetLocation.location[1]) - 0.0001, Number(targetLocation.location[0]) - 0.0017], 18)
      } else {
        setMarker([])
        map.flyTo(position, defaultState.zoom)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLocation]);

  return (
    <MapContainer ref={mapRef} center={position} zoomControl={false} zoom={Zoom} scrollWheelZoom={true} style={{ height: "100vh" }}>
      <TileLayer
        // attribution="Google Maps"
        url={url}
      // minZoom={1}
      // zoomOffset={-1}
      />

      <MapEvents />

      {marker.map(pt =>
        <Marker position={[pt.lat, pt.lng]} icon={customMarker}>
          <Tooltip className="location-tips" direction="center" offset={[-10, 30]} opacity={1} permanent>
            <img alt="marker" width={"40px"} style={{ marginBottom: "50px" }} src="icons/marker.png"></img>
          </Tooltip>
        </Marker>
      )

      }


      <GeoJSON data={features} style={setColor} />

      {
        centerPts.map((pt) => {
          return (
            <Marker position={[pt[0].lng, pt[0].lat]} className={"area-label"} >
              {/* <Popup>Popup for Marker</Popup> */}
              <Tooltip className="location-tips" direction="center" offset={[-10, 30]} opacity={1} permanent>
                <span className={Zoom >= 16 && "visible"} style={{fontSize: Zoom*0.8}}>{pt[1].label}</span>
              </Tooltip>
            </Marker>
          )
        })
      }

    </MapContainer >
  );

}