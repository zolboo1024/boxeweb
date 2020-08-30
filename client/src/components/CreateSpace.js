import React, {Component} from 'react';
import axios from 'axios';
import {loadUser} from '../actions/authActions';
import {connect} from 'react-redux';
import {tokenConfigJS} from './tokenConfig';
import {Alert} from 'reactstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

class CreateSpace extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeAreaWidth = this.onChangeAreaWidth.bind(this);
    this.onChangeAreaLength = this.onChangeAreaLength.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.setLatitude = this.setLatitude.bind(this);
    this.setLongitude = this.setLongitude.bind(this);
    this.state = {
      username: '',
      description: '',
      location: '',
      areawidth: 0,
      arealength: 0,
      price: 0,
      msg: '',
      image: null,
      preview: null,
      latitude: 0,
      longitude: 0
    }
  }
  setLatitude(e) {
    this.setState({latitude: e})
  }
  setLongitude(e) {
    this.setState({longitude: e})
  }
  onChangeUsername(e) {
    this.setState({username: e.target.value})
  }
  onChangeAreaWidth(e) {
    this.setState({areawidth: e.target.value})
  }
  onChangeAreaLength(e) {
    this.setState({arealength: e.target.value})
  }
  onChangePrice(e) {
    this.setState({price: e.target.value})
  }

  onChangeDescription(e) {
    this.setState({description: e.target.value})
  }
  onChangeImage(e) {
    this.setState({image: e.target.files[0]});
    this.setState({
      preview: URL.createObjectURL(e.target.files[0])
    });
  }
  onChangeLocation = newlocation => {
    this.setState({location: newlocation});
  };

  handleSelect = address => {
    geocodeByAddress(address).then(results => {
      getLatLng(results[0]).then(latLng => {
        console.log('Success', latLng);
        this.setLatitude(latLng.lat);
        this.setLongitude(latLng.lng);
      });
      //results[0].formatted_address contains the address that you can put in one line
      var formatted_address = results[0].formatted_address;
      this.onChangeLocation(formatted_address);
    }).catch(error => console.error('Error', error));
  }
  onSubmit(e) {
    e.preventDefault();

    const thisspace = {
      username: this.props.user.username,
      description: this.state.description,
      location: this.state.location,
      areawidth: this.state.areawidth,
      arealength: this.state.arealength,
      price: this.state.price,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      creatorid: this.props.user._id
    }
    const data = new FormData();
    //Here we are specifyin what kind of name that the file will be under in this form.
    data.append('file', this.state.image);
    data.append('username', thisspace.username);
    data.append('description', thisspace.description);
    data.append('location', thisspace.location);
    data.append('areawidth', thisspace.areawidth);
    data.append('arealength', thisspace.arealength);
    data.append('price', thisspace.price);
    data.append('latitude', thisspace.latitude);
    data.append('longitude', thisspace.longitude);
    data.append('creatorid', thisspace.creatorid);
    axios.post('/spaces/upload', data, tokenConfigJS(this.props.token)).then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      }
    });
  }
  render() {
    var margincss = {
      'margin': '20'
    };
    return (<div>
      <h3 style={{textAlign: "center"}}>Create New Space</h3>
      {
        this.state.msg
          ? (<Alert color="danger">{this.state.msg}</Alert>)
          : null
      }
      <form onSubmit={this.onSubmit} style = {margincss}>
        <label>Location:
        </label>
        <PlacesAutocomplete value={this.state.location} onChange={this.onChangeLocation} onSelect={this.handleSelect}>
          {
            ({getInputProps, suggestions, getSuggestionItemProps, loading}) => (<div>
              <input {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}/>
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {
                  suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                        backgroundColor: '#fafafa',
                        cursor: 'pointer'
                      }
                      : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer'
                      };
                    return (<div {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}>
                      <span>{suggestion.description}</span>
                    </div>);
                  })
                }
              </div>
            </div>)
          }
        </PlacesAutocomplete>
        <div className="form-group">
          <label>Description:
          </label>
          <input type="text" required="required" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
        </div>
        <div className="form-group">
          <label>The space is:
          </label>
          <input type="number" required="required" className="form-control" value={this.state.areawidth} onChange={this.onChangeAreaWidth}/>
          <label>By
          </label>
          <input type="number" required="required" className="form-control" value={this.state.arealength} onChange={this.onChangeAreaLength}/>
        </div>
        <div className="form-group">
          <label>Price per month:
          </label>
          <input type="number" required="required" className="form-control" value={this.state.price} onChange={this.onChangePrice}/>
        </div>
        <div className="custom-file mb-3">
          <input type="file" name="file" id="file" className="custom-file-input" onChange={this.onChangeImage}></input>
          <label className="custom-file-label">Choose file</label>
        </div>
        <div>
          {
            this.state.image
              ? (<img src={this.state.preview}/>)
              : null
          }
        </div>
        <div className="form-group" style={{textAlign: "center"}}>
          <input type="submit" value="Create Space Log" className="btn btn-primary"/>
        </div>
      </form>
    </div>)
  }
}
//MApping state to props means that these values are actually attached to the
//state of this component (REgistermodal).
const mapStateToProps = state => ({user: state.auth.user, isAuthenticated: state.auth.isAuthenticated, token: state.auth.token});

export default connect(mapStateToProps, {loadUser})(CreateSpace);
