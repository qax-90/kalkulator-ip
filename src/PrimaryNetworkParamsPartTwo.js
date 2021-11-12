import React, { Component } from 'react';

export class PrimaryNetworkParamsPartTwo extends Component {
  render() {
    if (this.props.networkMaskNumber <= 30) {
      return (
        <div>
          <div className="row pb-4 gy-2 d-flex align-items-center">
            <div className="col-sm-2 col-md-3">
              <h5>Liczba hostów:</h5>
            </div>
            <div className="col-sm-3 col-md-3">
              <div>Zapis dziesiętny:</div>
              <div><span className="text-info">{this.props.hostsNumberNumber}</span></div>
            </div>
            <div className="col-sm-7 col-md-6">
              <div>Zapis binarny:</div>
              <div><span className="text-info">{this.props.hostsNumberBinary}</span></div>
            </div>
          </div>
          <div className="row pb-4 gy-2 d-flex align-items-center">
            <div className="col-sm-2 col-md-3">
              <h5>Host mini-<br />malny:</h5>
            </div>
            <div className="col-sm-3 col-md-3">
              <div>Zapis dziesiętny:</div>
              <div><span className="text-info">{this.props.hostMinAddressDecimal}</span></div>
            </div>
            <div className="col-sm-7 col-md-6">
              <div>Zapis binarny:</div>
              <div><span className="text-success">{this.props.hostMinAddressBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.hostMinAddressBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
            </div>
          </div>
          <div className="row pb-4 gy-2 d-flex align-items-center">
            <div className="col-sm-2 col-md-3">
              <h5>Host maksy-<br />malny:</h5>
            </div>
            <div className="col-sm-3 col-md-3">
              <div>Zapis dziesiętny:</div>
              <div><span className="text-info">{this.props.hostMaxAddressDecimal}</span></div>
            </div>
            <div className="col-sm-7 col-md-6">
              <div>Zapis binarny:</div>
              <div><span className="text-success">{this.props.hostMaxAddressBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.hostMaxAddressBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
            </div>
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
