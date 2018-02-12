import React, { Component } from 'react';
import './picks.css';
import PropTypes from 'prop-types';
import Pick from '../pick/pick';

class Picks extends Component{
  constructor(props){
    super(props);
    this.message = "Hello from the Picks component!"
    this.state = {
      picks: [
        {  id: 1, DriverID: 80000323, FirstName: "Dakoda", LastName: "Armstrong", PhotoUrl: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nas/low-res/80000323.png" },
        {  id: 2, DriverID: 80000300, FirstName: "Michael", LastName: "Annett", PhotoUrl: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nas/low-res/80000300.png" },
        {  id: 3, DriverID: 80000465, FirstName: "Norm", LastName: "Benning", PhotoUrl: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nas/low-res/80000465.png" },
        {  id: 4, DriverID: 80000286, FirstName: "Ryan", LastName: "Blaney", PhotoUrl: "https://s3-us-west-2.amazonaws.com/static.fantasydata.com/headshots/nas/low-res/80000286.png" },
      ],
    }
  }

  render(props){
    return(
      <div className="picksWrapper">
        <div className="picksHeader">
          <div className="heading">{this.message}</div>
        </div>
        <div className="picksBody">
          {
            this.state.picks.map((pick) => {
              return (
                <Pick FirstName={pick.FirstName} LastName={pick.LastName} DriverID={pick.DriverID} PhotoUrl={pick.PhotoUrl} key={pick.id}/>
              )
            })
          }

        </div>
        <div className="picksFooter">
          <div className="footer"></div>
        </div>
      </div>
    )
  }
}

Picks.propTypes = {
}

export default Picks;
