import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Redux from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import {register} from '../../actions/authActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = { //Prop types is what it sounds like. Kinda like a
    //set of premade global variables
    isAuthenticated:  PropTypes.bool,
    error: PropTypes.object.isRequired
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal //When you toggle, you're switching the state of the modal.
      //from true to false or vice versa
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };
  //When you click submit, the modal should toggle and therefore should disappear
  onSubmit = e => {
    e.preventDefault();

    this.toggle();
  };

  render() {
    return (
      <div>
        <h3>
          Register
        </h3>
        {/*For example, Modal component takes as its "input", the Modal variable
        of the state and whenever it changes, it changes accordingly.
        */}
        <Form onSubmit= {this.onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="mb-3"
              onChange={this.onChange}
            />
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={this.onChange}
            />
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mb-3"
              onChange={this.onChange}
            />
            <Button>
            <Link to="/" className="nav-link">Register</Link>
            </Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  {}
) (RegisterModal);
