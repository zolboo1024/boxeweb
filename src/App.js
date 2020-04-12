import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
//We are using Router the same way we used router in the backend.
//USing router, we can specify where it goes when the browser goes
//to a specific path.

//*But how does it find where the paths are? Maybe router is a global
//variable that is saved after every modification.
import CustomNavbar from "./components/CustomNavbar"
import SpacesList from "./components/spaces-list.component";
import EditSpace from "./components/edit-space.component";
import CreateSpace from "./components/CreateSpace";
import {loadUser} from "./actions/authActions"; //
import {Provider} from 'react-redux';
import store from './store';
import RegisterModal from './components/auth/RegisterModal';
import LoginModal from './components/auth/LoginModal';
import LogoutModal from './components/auth/LogoutModal';
import DetailedSpace from './components/DetailedSpace';
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    //when setting the path for the route, when you
    //do the home directory, you have to set the
    //exact variable to be true. Otherwise,
    //the thing gets loaded at every page even though it's not
    //exactly that route
    return (<Provider store={store}>
      <Router>
        <div>
          <CustomNavbar/>
          <br/>
          <Route path="/" exact={true} component={SpacesList}/>
          <Route path="/edit/:id" component={EditSpace}/>
          <Route path="/create" component={CreateSpace}/>
          <Route path="/register" component={RegisterModal}/>
          <Route path="/login" component={LoginModal}/>
          <Route path="/logout" component={LogoutModal}/>
          <Route path="/spaces/:id" component={DetailedSpace}/>
        </div>
      </Router>
    </Provider>);
  }
}
export default App;
