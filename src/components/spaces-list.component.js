import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Space = props => (
  <tr>
    <td>{props.space.username}</td>
    <td>{props.space.description}</td>
    <td>{props.space.location}</td>
    <td>{props.space.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.space._id}>edit</Link> | <a href="#" onClick={() => { props.deleteSpace(props.space._id) }}>delete</a>
    </td>
  </tr>
)

export default class SpacesList extends Component {
  constructor(props) {
    super(props);

    this.deleteSpace = this.deleteSpace.bind(this)

    this.state = {spaces: []};
  }

  componentDidMount() {
    axios.get('http://localhost:3000/spaces/')
      .then(response => {
        this.setState({ spaces: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSpace(id) {
    axios.delete('http://localhost:3000/spaces/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      spaces: this.state.spaces.filter(el => el._id !== id)
    })
  }

  spaceList() {
    return this.state.spaces.map(currentspace => {
      return <Space space={currentspace} deleteSpace={this.deleteSpace} key={currentspace._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Spaces</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.spaceList() }
          </tbody>
        </table>
      </div>
    )
  }
}
