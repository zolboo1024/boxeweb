import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

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
