import React, {Component} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import 'materialize-css';
import {Collection, CollectionItem} from 'react-materialize';
import SpaceMap from './SpaceMap';
class SpacesList extends Component {
  constructor(props) {
    super(props);

    this.deleteSpace = this.deleteSpace.bind(this);
    this.onMouseExit = this.onMouseExit.bind(this);
    this.onHoverOver = this.onHoverOver.bind(this);
    this.state = {
      spaces: [],
      coord: [],
      hoveringover: {
        markerLat: 0,
        markerLong: 0
      }
    };
  }
  componentDidMount() {
    //When the component mounts, we can make adjustments. This only runs once
    //so we can make some adjustments before it renders.
    axios.get('http://localhost:3000/spaces/', tokenConfigJS(this.props.token)).then(response => {
      const spacecopy = [...response.data];
      const size = spacecopy.length;
      let coord = new Array(size);
      var i;
      //here, we save the coordinates in the spaces that
      //is presented and then save it in our state
      //to be passed down to the maps component.
      for (i = 0; i < size; i++) {
        coord[i] = {
          markerLat: spacecopy[i].latitude,
          markerLong: spacecopy[i].longitude
        };
      }
      this.setState({coord: coord, spaces: spacecopy});
    }).catch((error) => {
      console.log(error);
    })
  }
  onHoverOver(id, lat, longi) {
    this.setState({
      hoveringover: {
        markerLat: lat,
        markerLong: longi
      }
    });
  }
  onMouseExit() {
    this.setState({hoveringover: null})
  }
  componentDidUpdate() {
    console.log(this.state.hoveringover)
  }
  deleteSpace(id) {
    axios.delete('http://localhost:3000/spaces/' + id).then(response => {
      console.log(response.data)
    });

    this.setState({
      spaces: this.state.spaces.filter(el => el._id !== id)
    })
  }
  //When you go to the spaces/images/:imagename URL, it gets read by the Server
  //and according to how we set the route, it then pulls the image from the
  //database. Mongo
  spaceList() {
    return this.state.spaces.map(currentspace => {
      return <CollectionItem className="avatar" onMouseEnter={() => {
          this.onHoverOver(currentspace._id, currentspace.latitude, currentspace.longitude)
        }} onMouseLeave={this.onMouseExit} key={currentspace._id}>
        <img alt="" className="circle" src={"http://localhost:3000/spaces/images/" + currentspace.imagename}/>
        <span className="title">
          {currentspace.description}
        </span>
        <p>
          {currentspace.location}
          <br/>
          Dimensions and price
        </p>
      </CollectionItem>;
    })
  }

  render() {
    var left = {
      'float': 'left',
      'width': '50%'
    };
    var right = {
      'float': 'right',
      'width': '50%'
    };
    var main = {
      'overflow': 'hidden'
    };
    return (<div>
      <div id="main" style={main}>
        <div id="left" style={left}>
          <h3>Logged Spaces</h3>
          <Collection>
            {this.spaceList()}
          </Collection>
        </div>
        <div id="right" style={right}>
          <SpaceMap key='lmao' coord={this.state.coord} hoveringover={this.state.hoveringover}/>
        </div>
      </div>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(SpacesList);
