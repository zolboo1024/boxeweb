import React, {Component} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import 'materialize-css';
import {Collection, CollectionItem} from 'react-materialize';

class SpacesList extends Component {
  constructor(props) {
    super(props);

    this.deleteSpace = this.deleteSpace.bind(this)
    this.imageURL = this.imageURL.bind(this)
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
    console.log(spaces[0])
  }
  imageURL(img) {
    console.log(img);
  }
  deleteSpace(id) {
    axios.delete('http://localhost:3000/spaces/' + id).then(response => {
      console.log(response.data)
    });

    this.setState({
      spaces: this.state.spaces.filter(el => el._id !== id)
    })
  }

  spaceList() {
    return this.state.spaces.map(currentspace => {
      return <CollectionItem className="avatar">
        <img alt="" className="circle" src={this.imageURL(currentspace.image)}/>
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
      <h3>Logged Spaces</h3>
      <Collection>
        {this.spaceList()}
      </Collection>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(SpacesList);
