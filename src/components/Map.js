import React, { Component } from "react";
// import "@blueprintjs/core/lib/less/variables.less";
import {
  Button,
  H5,
  Card,
  Icon,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Popover,
  Position,
  Spinner,
  Switch,
  Tag,
  Tooltip,
} from "@blueprintjs/core";

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "@syncromatics/react-google-maps"

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={18}
      // 49.669352, 20.687573
      defaultCenter={{ lat: 49.669352, lng: 20.687573 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 49.669352, lng: 20.687573 }} />
      )}
    </GoogleMap>
  ))
);


class Map extends Component {
  state = {
    marker: true,
    temp: "BIzaSyCyQdVfdevsbKnczaYB3p9H_9eMnghSh6E",
    apikey: "AIzaSyCyQdVfdevsbKnczaYB3p9H_9eMnghSh6E"
  };

  handleEnabledChange = () => {
    this.setState(prevState => ({ marker: !prevState.marker }));
  };

  handleLoadMap = () => {
    this.setState(prevState => ({ apikey: prevState.temp }));
  };

  handleTempChange = e => {
    this.setState({ temp: e.target.value });
  };

  render() {
    const { marker, apikey, temp } = this.state;
    const lockButton = (
      <Tooltip content={`Load map`} disabled={false}>
        <Button
          disabled={false}
          icon={"refresh"}
          intent={temp === null ? Intent.WARNING : Intent.SUCCESS}
          minimal={true}
          onClick={this.handleLoadMap}
        />
      </Tooltip>
    );
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ position: "absolute", left: 10, top: 20 }}>
          <Card>
            <InputGroup
              width={500}
              disabled={false}
              large={true}
              placeholder="GoogleMaps API Key..."
              rightElement={lockButton}
              type={"text"}
              value={temp}
              onChange={this.handleTempChange}
            />
          </Card>
        </div>
          <MyMapComponent
            isMarkerShown={marker}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?${apikey !== null ? `key=${apikey}`:""}&amp;v=3.exp&amp;libraries=geometry,drawing`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

      </div>
    );
  }
}

export default Map;
