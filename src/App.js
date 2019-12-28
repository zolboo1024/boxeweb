import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
//We are using Router the same way we used router in the backend.
//USing router, we can specify where it goes when the browser goes
//to a specific path.

//*But how does it find where the paths are? Maybe router is a global
//variable that is saved after every modification. 
import Navbar from "./components/navbar.component"
import SpacesList from "./components/spaces-list.component";
import EditSpace from "./components/edit-space.component";
import CreateSpace from "./components/create-space.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={SpacesList} />
      <Route path="/edit/:id" component={EditSpace} />
      <Route path="/create" component={CreateSpace} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
