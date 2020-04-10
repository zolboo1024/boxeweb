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
    this.state = {
      spaces: [],
      coord: []
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
      for (i = 0; i < size; i++) {
        coord[i] = [
          spacecopy[i].latitude,
          spacecopy[i].longitude
        ];
      }
      this.setState({coord: coord, spaces: spacecopy});
    }).catch((error) => {
      console.log(error);
    })
  }
  componentDidUpdate() {
    //console.log(this.state.coord);
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
      return <CollectionItem className="avatar">
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
          <SpaceMap key='lmao' coord={this.state.coord}/>
        </div>
      </div>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(SpacesList);
