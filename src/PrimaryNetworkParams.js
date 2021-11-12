import React, { Component } from 'react';
import { NetworkType } from './NetworkType';
import { NetworkAddress } from './NetworkAddress';
import { BroadcastAddress } from './BroadcastAddress';

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
        <NetworkType
        networkMaskNumber={this.props.networkMaskNumber}
        networkAddressBinary={this.props.networkAddressBinary} />
        <NetworkAddress
        networkMaskNumber={this.props.networkMaskNumber}
        networkAddressDecimal={this.props.networkAddressDecimal}
        networkAddressBinary={this.props.networkAddressBinary} />
        <BroadcastAddress
        networkMaskNumber={this.props.networkMaskNumber}
        broadcastAddressDecimal={this.props.broadcastAddressDecimal}
        broadcastAddressBinary={this.props.broadcastAddressBinary} />
      </div>
    )
  }
}
