import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
const maps_key = process.env.MY_GMAPS_KEY;
const AnyReactComponent = ({text}) => <div>{text}</div>;
export default class SpaceMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
    // Important! Always set the container height explicitly
    <div style={{
        height: '100vh',
        width: '100%'
      }}>
      <GoogleMapReact bootstrapURLKeys={{
          key: maps_key
        }} defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
        {
          this.props.coord.map(currentcoord => {
            return <AnyReactComponent lat={currentcoord[0]} lng={currentcoord[1]} text="price"/>
          })
        }
      </GoogleMapReact>
    </div>);
  }
}
