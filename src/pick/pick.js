import React, { Component } from 'react';
import './pick.css';
import PropTypes from 'prop-types';

class Pick extends Component{
  constructor(props){
    super(props);
    this.FirstName = props.FirstName;
    this.LastName = props.LastName;
    this.DriverID = props.DriverID;
    this.PhotoUrl = props.PhotoUrl;
  }

  render(props){
    return(
      <div>
        <img src={this.PhotoUrl} />
        <h5>{this.FirstName} {this.LastName}</h5>
        <h8>{this.DriverID}</h8>
      </div>
    )
  }
}

Pick.propTypes = {
  FirstName: PropTypes.string,
  LastName: PropTypes.string,
  DriverID: PropTypes.string,
  PhotoUrl: PropTypes.string
}

export default Pick;
