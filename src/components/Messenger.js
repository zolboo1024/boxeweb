import React, {Component} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import 'materialize-css';
import {ChatFeed, Message} from 'react-chat-ui';
import socketIOClient from "socket.io-client";
var socket;
class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enduser: null
    };
  }
  componentDidMount() {
    socket = socketIOClient('http://localhost:5000/');
    socket.on('chat-message', data => {
      console.log(data);
    })

    axios.get('http://localhost:3000/spaces/' + this.props.match.params.id).then(res => {
      this.setState({enduser: res.data});
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
      <ChatFeed messages={this.state.messages}
        // Boolean: list of message objects
        isTyping={this.state.is_typing}
        // Boolean: is the recipient typing
        hasInputField={false}
        // Boolean: use our input, or use your own
        showSenderName="showSenderName"
        // show the name of the user who sent the message
        bubblesCentered={false}
        //Boolean should the bubbles be centered in the feed?
        
        // JSON: Custom bubble styles
        bubbleStyles={{
          text: {
            fontSize: 30
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40
          }
        }}/>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(Messenger);
