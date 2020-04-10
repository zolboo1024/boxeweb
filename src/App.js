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
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (<Provider store={store}>
      <Router>
        <div>
          <CustomNavbar/>
          <br/>
          <Route path="/" exact={false} component={SpacesList}/>
          <Route path="/edit/:id" component={EditSpace}/>
          <Route path="/create" component={CreateSpace}/>
          <Route path="/register" component={RegisterModal}/>
          <Route path="/login" component={LoginModal}/>
          <Route path="/logout" component={LogoutModal}/>
        </div>
      </Router>
    </Provider>);
  }
}
export default App;
