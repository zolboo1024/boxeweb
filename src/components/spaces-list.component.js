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

    this.deleteSpace = this.deleteSpace.bind(this)
    this.state = {
      spaces: []
    };
  }
  componentDidMount() {

    axios.get('http://localhost:3000/spaces/', tokenConfigJS(this.props.token)).then(response => {
      this.setState({spaces: response.data})
    }).catch((error) => {
      console.log(error);
    })
  }
  componentDidUpdate() {
    console.log(this.state.spaces[0])
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
    return (<div>
      <div className="row">
        <div className="column">
          <h3>Logged Spaces</h3>
          <Collection>
            {this.spaceList()}
          </Collection>
        </div>
        <div className="column">
          <div className="container" width='500' height='500'>
            <SpaceMap/>
          </div>
        </div>
      </div>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(SpacesList);
