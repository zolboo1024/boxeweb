import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
//We are using Router the same way we used router in the backend.
//USing router, we can specify where it goes when the browser goes
//to a specific path.

//*But how does it find where the paths are? Maybe router is a global
//variable that is saved after every modification.
import CustomNavbar from "./components/navbar.component"
import SpacesList from "./components/spaces-list.component";
import EditSpace from "./components/edit-space.component";
import CreateSpace from "./components/create-space.component";
import CreateUser from "./components/create-user.component";
import {loadUser} from "./actions/authActions";//
import {Provider} from 'react-redux';
import store from './store';
import RegisterModal from './components/auth/RegisterModal';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render () {
    return (
      <Provider store={store}>
      <Router>
        <div className="container">
        <CustomNavbar />
        <br/>
        <Route path="/" exact component={SpacesList} />
        <Route path="/edit/:id" component={EditSpace} />
        <Route path="/create" component={CreateSpace} />
        <Route path="/user" component={CreateUser} />
        <Route path="/register" component={RegisterModal} />
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
