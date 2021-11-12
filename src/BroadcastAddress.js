import React, { Component } from 'react';

export class BroadcastAddress extends Component {
  render() {
    if (this.props.networkMaskNumber <= 31) {
      return (
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Adres rozgło-<br />szeniowy:</h5>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Zapis dziesiętny:</div>
            <div><span className="text-info">{this.props.broadcastAddressDecimal}</span></div>
          </div>
          <div className="col-sm-7 col-md-6">
            <div>Zapis binarny:</div>
            <div><span className="text-success">{this.props.broadcastAddressBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.broadcastAddressBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
