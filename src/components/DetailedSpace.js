import React, {Component} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import 'materialize-css';
import {
  Slider,
  Slide,
  Caption,
  MediaBox,
  Card,
  CardTitle,
  Icon
} from 'react-materialize';

class DetailedSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: null
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/spaces/' + this.props.match.params.id).then(res => {
      this.setState({space: res.data});
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    var main = {
      'padding': '20'
    };
    var image = {
      'height': '40%',
      'overflow': 'hidden'
    }
    return (<div>
      {
        this.state.space
          ? (<Card actions={[<a key="1" href={"http://localhost:3001/chat/" + this.state.space.creatorid}>Message the host</a>
              ]} closeIcon={<Icon> close</Icon>} header={<CardTitle image = {
              "http://localhost:3000/spaces/images/" + this.state.space.imagename
            }
            style = {
              main
            } > {
              this.state.space.location
            }
            </CardTitle>} revealIcon={<Icon> more_vert</Icon>} style={main}>
            {this.state.space.description}
          </Card>)
          : null
      }
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(DetailedSpace);
