import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'

import features from "../jsons/features.json"

import React from "react";

import L from "leaflet"

// var map = L.map("map", {
//     scrollWheelZoom : false;
// });a

// map.setView([-95.343007, 29.721150], 14.8)

const position = [29.721150, -95.343007]

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

export default class UHMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 29.721150,
      lng: -95.343007,
      zoom: 16,
    };
  }

  componentDidMount() {

  }

  render() {
    const position = [this.state.lat, this.state.lng];

    const key = 'NlqVQVaYotWw1C9mjheO';
    const url = `https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=${key}`

    return (
      <MapContainer center={position} zoom={this.state.zoom} scrollWheelZoom={true} style={{ height: "100vh" }}>
        <TileLayer
          // attribution="Google Maps"
          url={url}
          // minZoom={1}
          // zoomOffset={-1}
        />
        

        <GeoJSON data={features} style={setColor} />

      </MapContainer>
    );
  }
}