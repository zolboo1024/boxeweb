import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {tokenConfigJS} from './tokenConfig';
import {loadUser} from '../actions/authActions';
import queryString from 'query-string';
import {connect} from 'react-redux';
import 'materialize-css';
import socketIOClient from "socket.io-client";
let socket;
class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enduser: null,
      joined: false
    };
  }
  componentDidMount() {
    socket = socketIOClient('localhost:3002');
    if(this.props.user) {
      this.emitWhenJoining(socket);
    }
  }
  emitWhenJoining(socket) {
    let senderID = this.props.user._id;
    let receiverID = this.props.match.params._id;
    socket.emit('join', {senderID, receiverID}, ()=> {
    });
    this.setState({joined: true});
  }
  componentDidUpdate(){
    if(!this.state.joined){
    this.emitWhenJoining(socket);
    socket.on('chat-message', data => {
      console.log(data);
    });
    }
  }
  componentWillUnmount(){
    socket.emit('disconnect');
    socket.off();
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
      Chat
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(Messenger);
