import React, { Component } from 'react';

export class NetworkType extends Component {
  firstBits = () => {
    if (this.props.networkAddressBinary.toString().substring(0, 4) === '1111') {
      return '1111'
    } else if (this.props.networkAddressBinary.toString().substring(0, 4) === '1110') {
      return '1110'
    } else if (this.props.networkAddressBinary.toString().substring(0, 3) === '110') {
      return '110'
    } else if (this.props.networkAddressBinary.toString().substring(0, 2) === '10') {
      return '10'
    } else if (this.props.networkAddressBinary.toString().substring(0, 1) === '0') {
      return '0'
    }
  }
  networkClass = () => {
    if (this.props.networkAddressBinary.toString().substring(0, 4) === '1111') {
      return 'Stara klasa E'
    } else if (this.props.networkAddressBinary.toString().substring(0, 4) === '1110') {
      return 'Stara klasa D'
    } else if (this.props.networkAddressBinary.toString().substring(0, 3) === '110') {
      return 'Stara klasa C'
    } else if (this.props.networkAddressBinary.toString().substring(0, 2) === '10') {
      return 'Stara klasa B'
    } else if (this.props.networkAddressBinary.toString().substring(0, 1) === '0') {
      return 'Stara klasa A'
    }
  }
  render() {
    if (this.props.networkMaskNumber <= 30) {
      return (
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Typ sieci:</h5>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Pierwsze bity:</div>
            <div><span className="text-info">{this.firstBits()}</span></div>
          </div>
          <div className="col-sm-7 col-md-6">
            <div>Klasa sieci:</div>
            <div><span className="text-info">{this.networkClass()}</span></div>
          </div>
        </div>
      )
    }
    else if (this.props.networkMaskNumber === 31) {
      return (
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Typ sieci:</h5>
          </div>
          <div className="col-sm-10 col-md-9">
            <div>Punkt-punkt</div>
          </div>
        </div>
      )
    } else if (this.props.networkMaskNumber === 32) {
      return (
        <div className="row pb-4 gy-2 d-flex align-items-center">
          <div className="col-sm-2 col-md-3">
            <h5>Typ sieci:</h5>
          </div>
          <div className="col-sm-10 col-md-9">
            <div>To nie jest sieć tylko pojedynczy host</div>
          </div>
        </div>
      )
    }
  }
}
