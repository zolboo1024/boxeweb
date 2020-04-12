import React, {Component} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import 'materialize-css';
import {Slider, Slide, Caption, MediaBox} from 'react-materialize';

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
    return (<div>
      <Slider fullscreen={false} options={{
          duration: 500,
          height: 400,
          indicators: true,
          interval: 6000
        }}>
        {
          this.state.space
            ? (<MediaBox>
              <img alt="" src={"http://localhost:3000/spaces/images/" + this.state.space.imagename
}/>
            </MediaBox>)
            : null
        }
        <Caption placement="center">
          <h3>
            This is our big Tagline!
          </h3>
          <h5 className="light grey-text text-lighten-3">
            Here's our small slogan.
          </h5>
        </Caption>
      </Slider>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(DetailedSpace);
