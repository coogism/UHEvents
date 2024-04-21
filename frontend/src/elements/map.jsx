import "../App.css"

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip } from 'react-leaflet'

import features from "../jsons/features.json"

import React from "react";

import L from "leaflet"

// var map = L.map("map", {
//     scrollWheelZoom : false;
// });a

// map.setView([-95.343007, 29.721150], 14.8)

// const position = [29.721150, -95.343007]

// const customized_tooltip = stylecom

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

// conosl

export default class UHMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 29.721150,
      lng: -95.343007,
      zoom: 15.5,
    };
  }

  componentDidMount() {
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const key = 'NlqVQVaYotWw1C9mjheO';
    const url = `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${key}`

    return (
      <MapContainer center={position} zoomControl={false} zoom={this.state.zoom} scrollWheelZoom={true} style={{ height: "100vh" }}>
        <TileLayer
          // attribution="Google Maps"
          url={url}
        // minZoom={1}
        // zoomOffset={-1}
        />


        <GeoJSON data={features} style={setColor} />

        {centerPts.map(pt =>
          <Marker position={[pt[0].lng, pt[0].lat]} >
            {/* <Popup>Popup for Marker</Popup> */}
            <Tooltip className="location-tips" direction="center" offset={[-10, 30]} opacity={1} permanent>
              {pt[1].label}
            </Tooltip>
          </Marker>
        )}

      </MapContainer>
    );
  }
}