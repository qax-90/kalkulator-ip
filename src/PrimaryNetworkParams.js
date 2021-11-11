import React, { Component } from 'react';

export class PrimaryNetworkParams extends Component {
  render() {
    return (
      <div>
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Adres IP hosta:</h5>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Zapis dziesiętny:</div>
            <div><span className="text-info">{this.props.ipAddressDecimal}</span></div>
          </div>
          <div className="col-sm-7 col-md-6">
            <div>Zapis binarny:</div>
            <div><span className="text-success">{this.props.ipAddressBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.ipAddressBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
          </div>
        </div>
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Maska sieciowa:</h5>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Zapis dziesiętny:</div>
            <div><span className="text-info">{this.props.networkMaskDecimal}</span></div>
          </div>
          <div className="col-sm-7 col-md-6">
            <div>Zapis binarny:</div>
            <div><span className="text-success">{this.props.networkMaskBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.networkMaskBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
          </div>
        </div>
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Adres sieci:</h5>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Zapis dziesiętny:</div>
            <div><span className="text-info">{this.props.networkAddressDecimal}</span></div>
          </div>
          <div className="col-sm-7 col-md-6">
            <div>Zapis binarny:</div>
            <div><span className="text-success">{this.props.networkAddressBinary.toString().substring(0, this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8))}</span><span className="text-danger">{this.props.networkAddressBinary.toString().substring(this.props.networkMaskNumber + Math.floor(this.props.networkMaskNumber / 8), 35)}</span></div>
          </div>
        </div>
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
  };
}
