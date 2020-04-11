import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MarkersOnMap from 'markers-on-map-react';
const maps_key = process.env.MY_GMAPS_KEY;
const AnyReactComponent = ({text}) => <div>{text}</div>;

export default class SpaceMap extends Component {
  constructor(props) {
    super(props);
    this.initializeMap = this.initializeMap.bind(this);
  }
  componentDidMount() {
    //Basic initialize
    if (this.props.coord) {
      this.initializeMap();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.hoveringover != this.props.hoveringover) {
      this.initializeMap(this.props.hoveringover)
    } else {
      this.initializeMap();
    }
  }
  initializeMap(newCenter) {
    var center;
    if (!newCenter) {
      MarkersOnMap.Init({
        googleApiKey: 'AIzaSyAsdNhcJt9MW7ChPW-wrSNQmSSMb4d4dS4',
        //required => Google Maps JavaScript API Key( in string format)markerObjects: this.props.coord
        markerObjects: this.props.coord,
        mapHeight: '99%',
        markerLabel: {
          useLabel: true,
          labelPosition: 'top',
          labelFontSize: '50px',
          labelFontWeight: '600',
          labelFontFamily: 'Roboto'
        }
      });
      //Select map element(ID or Class)
      MarkersOnMap.Run('div#GoogleMap');
    } else {
      var newMarkers = [...this.props.coord];
      newMarkers.push({markerLat: newCenter.markerLat, markerLong: newCenter.markerLong, markerSize: 60, markerLabelText: 'X'});
      MarkersOnMap.Remarker(newMarkers);
    }
  }
  static defaultProps = {
    center: {
      lat: 37.802689,
      lng: -122.276756
    },
    zoom: 11
  };

  render() {
    return (
    // Important! Always set the container height explicitly
    <div id="GoogleMap"></div>);
  }
}
