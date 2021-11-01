import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: {decimal: '', binary: ''},
      networkMask: {number: 0, decimal: '', binary: ''},
      networkAddress: {decimal: '', binary: ''},
      broadcastAddress: {decimal: '', binary: ''},
      hostsNumber: {number: 0},
      hostMinAddress: {decimal: '', binary: ''},
      hostMaxAddress: {decimal: '', binary: ''}
    };
    this.getTodos = this.getTodos.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }
  async getTodos() {
    let data = await axios.get('https://api.ipify.org').then(function(response) {
      return response;
    }).catch(function(error) {
      console.log(error);
    });
    let ipAddressDecimal = data.data;
    let ipAddressDecimalOctets = ipAddressDecimal.split('.');
    let ipAddressBinaryOctets = ipAddressDecimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
    let ipAddressBinary = ipAddressBinaryOctets.join('.');
    this.setState({ ipAddress: {decimal: ipAddressDecimal, binary: ipAddressBinary}, networkMask: {number: 24, decimal: '255.255.255.0', binary: '11111111.11111111.11111111.00000000'} });
    this.updateSettings('ip-address-decimal', ipAddressDecimal, 24);
  }
  binaryIncrease = (number) => {
  	let outputNumber = '';
    let inputNumber = number.padStart(32, '0');
  	for (let loop = inputNumber.length - 1; loop >= 0; loop--) {
    	if (inputNumber.charAt(loop) === '0') {
      	outputNumber = inputNumber.substring(0, loop) + '1' + inputNumber.substring(loop + 2);
        break;
      } else if (inputNumber.charAt(loop) === '1') {
      	if (loop === 0) {
        	outputNumber = outputNumber.padEnd(32, '1');
        	break;
        }
      	if (inputNumber.charAt(loop - 1) === '0') {
          outputNumber = inputNumber.substring(0, loop - 1) + '1';
          outputNumber = outputNumber.padEnd(32, '0');
          break;
        } else if (inputNumber.charAt(loop - 1) === '1') {
        	continue;
        }
      }
  	}
    return outputNumber;
  }
  binaryDecrease = (number) => {
	let outputNumber = '';
  let inputNumber = number.padStart(32, '0');
	for (let loop = inputNumber.length - 1; loop >= 0; loop--) {
  	if (inputNumber.charAt(loop) === '1') {
    	outputNumber = inputNumber.substring(0, loop) + '0' + inputNumber.substring(loop + 2);
      break;
    } else if (inputNumber.charAt(loop) === '0') {
    	if (loop === 0) {
      	outputNumber = outputNumber.padEnd(32, '0');
      	break;
      }
    	if (inputNumber.charAt(loop - 1) === '1') {
        outputNumber = inputNumber.substring(0, loop - 1) + '0';
        outputNumber = outputNumber.padEnd(32, '1');
        break;
      } else if (inputNumber.charAt(loop - 1) === '0') {
      	continue;
      }
    }
	}
  return outputNumber;
}
  createSelectItemsDecimal = () => {
    let items = [];
    for (let i = 0; i <= 32; i++) {
      let binaryNumber = '';
      binaryNumber = binaryNumber.padStart(i, '1');
      binaryNumber = binaryNumber.padEnd(32, '0');
      let binaryOctets = [binaryNumber.substring(0, 8), binaryNumber.substring(8, 16), binaryNumber.substring(16, 24), binaryNumber.substring(24)];
      let decimalOctets = binaryOctets.map(octet => parseInt(octet, 2));
      let decimalText = decimalOctets.join('.');
      items.push(<option key={i} value={i}>/{i} aka {decimalText}</option>);
    }
    return items;
  }
  createSelectItemsBinary = () => {
    let items = [];
    for (let i = 0; i <= 32; i++) {
      let binaryNumber = '';
      binaryNumber = binaryNumber.padStart(i, '1');
      binaryNumber = binaryNumber.padEnd(32, '0');
      let binaryText = binaryNumber.substring(0, 8) + '.' + binaryNumber.substring(8, 16) + '.' + binaryNumber.substring(16, 24) + '.' + binaryNumber.substring(24);
      items.push(<option key={i} value={i}>/{i} aka {binaryText}</option>);
    }
    return items;
  }
  updateSettings = (ipAddressType, ipAddress, networkMask) => {
    let ipAddressDecimalOctets, ipAddressBinaryOctets;
    if (ipAddressType === 'ip-address-decimal') {
      ipAddressDecimalOctets = ipAddress.split('.');
      ipAddressBinaryOctets = ipAddressDecimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
    } else if (ipAddressType === 'ip-address-binary') {
      ipAddressBinaryOctets = ipAddress.split('.');
      ipAddressDecimalOctets = ipAddressBinaryOctets.map(octet => parseInt(octet, 2));
    }
    let ipAddressDecimal = ipAddressDecimalOctets.join('.');
    let ipAddressBinary = ipAddressBinaryOctets.join('.');
    let networkMaskBinaryText = '';
    networkMaskBinaryText = networkMaskBinaryText.padStart(networkMask, '1');
    networkMaskBinaryText = networkMaskBinaryText.padEnd(32, '0');
    let networkMaskBinaryOctets = [networkMaskBinaryText.substring(0, 8), networkMaskBinaryText.substring(8, 16), networkMaskBinaryText.substring(16, 24), networkMaskBinaryText.substring(24)];
    let networkMaskDecimalOctets = networkMaskBinaryOctets.map(octet => parseInt(octet, 2));
    let networkMaskBinary = networkMaskBinaryText.substring(0, 8) + '.' + networkMaskBinaryText.substring(8, 16) + '.' + networkMaskBinaryText.substring(16, 24) + '.' + networkMaskBinaryText.substring(24);
    let networkMaskDecimal = networkMaskDecimalOctets.join('.');
    let ipAddressBinaryText = ipAddressBinaryOctets.join('');
    let networkAddressFirstPartBinaryText = ipAddressBinaryText.substring(0, parseInt(networkMask));
    let broadcastAddressFirstPartBinaryText = ipAddressBinaryText.substring(0, parseInt(networkMask));
    let networkAddressBinaryText = networkAddressFirstPartBinaryText.padEnd(32, '0');
    let broadcastAddressBinaryText = networkAddressFirstPartBinaryText.padEnd(32, '1');
    let networkAddressBinaryOctets = [networkAddressBinaryText.substring(0, 8), networkAddressBinaryText.substring(8, 16), networkAddressBinaryText.substring(16, 24), networkAddressBinaryText.substring(24)];
    let broadcastAddressBinaryOctets = [broadcastAddressBinaryText.substring(0, 8), broadcastAddressBinaryText.substring(8, 16), broadcastAddressBinaryText.substring(16, 24), broadcastAddressBinaryText.substring(24)];
    let networkAddressDecimalOctets = networkAddressBinaryOctets.map(octet => parseInt(octet, 2));
    let broadcastAddressDecimalOctets = broadcastAddressBinaryOctets.map(octet => parseInt(octet, 2));
    let networkAddressBinary = networkAddressBinaryText.substring(0, 8) + '.' + networkAddressBinaryText.substring(8, 16) + '.' + networkAddressBinaryText.substring(16, 24) + '.' + networkAddressBinaryText.substring(24);
    let broadcastAddressBinary = broadcastAddressBinaryText.substring(0, 8) + '.' + broadcastAddressBinaryText.substring(8, 16) + '.' + broadcastAddressBinaryText.substring(16, 24) + '.' + broadcastAddressBinaryText.substring(24);
    let broadcastAddressDecimal = broadcastAddressDecimalOctets.join('.');
    let networkAddressDecimal = networkAddressDecimalOctets.join('.');
    let hostMinAddressBinaryText = this.binaryIncrease(networkAddressBinaryText);
    let hostMaxAddressBinaryText = this.binaryDecrease(broadcastAddressBinaryText);
    let hostMinAddressBinaryOctets = [hostMinAddressBinaryText.substring(0, 8), hostMinAddressBinaryText.substring(8, 16), hostMinAddressBinaryText.substring(16, 24), hostMinAddressBinaryText.substring(24)];
    let hostMaxAddressBinaryOctets = [hostMaxAddressBinaryText.substring(0, 8), hostMaxAddressBinaryText.substring(8, 16), hostMaxAddressBinaryText.substring(16, 24), hostMaxAddressBinaryText.substring(24)];
    let hostMinAddressDecimalOctets = hostMinAddressBinaryOctets.map(octet => parseInt(octet, 2));
    let hostMaxAddressDecimalOctets = hostMaxAddressBinaryOctets.map(octet => parseInt(octet, 2));
    let hostMinAddressBinary = hostMinAddressBinaryOctets.join('.');
    let hostMinAddressDecimal = hostMinAddressDecimalOctets.join('.');
    let hostMaxAddressBinary = hostMaxAddressBinaryOctets.join('.');
    let hostMaxAddressDecimal = hostMaxAddressDecimalOctets.join('.');
    console.log(hostMinAddressBinaryText + ', ' + hostMaxAddressBinaryText);
    this.setState({ ipAddress: {decimal: ipAddressDecimal, binary: ipAddressBinary}, networkMask: {number: parseInt(networkMask), decimal: networkMaskDecimal, binary: networkMaskBinary}, networkAddress: {decimal: networkAddressDecimal, binary: networkAddressBinary}, broadcastAddress: {decimal: broadcastAddressDecimal, binary: broadcastAddressBinary}, hostsNumber: {number: (parseInt(networkMask) < 32) ? Math.floor(Math.pow(2, 32 - parseInt(networkMask)) - 2) : 0}, hostMinAddress: {decimal: hostMinAddressDecimal, binary: hostMinAddressBinary}, hostMaxAddress: {decimal: hostMaxAddressDecimal, binary: hostMaxAddressBinary} });
  }
  render() {
    return (
      <div className="container-lg">
        <main>
          <div className="py-5 text-center">
            <img className="d-block mx-auto mb-4" src="logo.png" alt="" width="150" height="150" />
            <h2 className="text-primary">Kalkulator IP</h2>
            <p className="lead">Aplikacja internetowa stanowiąca kalkulator do obliczania adresów IP w sieciach komputerowych.<br />Pozwala na wyznaczanie podstawowych parametrów sieci, a także ich podział na podsieci.</p>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <h4 className="mb-3 text-primary">Podstawowe parametry sieci</h4>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Adres IP hosta:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.ipAddress.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.ipAddress.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.ipAddress.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Maska sieciowa:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.networkMask.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.networkMask.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.networkMask.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Adres sieci:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.networkAddress.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.networkAddress.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.networkAddress.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Adres rozgło-<br />szeniowy:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.broadcastAddress.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.broadcastAddress.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.broadcastAddress.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Liczba hostów:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.hostsNumber.number}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-info">{(this.state.hostsNumber.number >>> 0).toString(2)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Host mini-<br />malny:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.hostMinAddress.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.hostMinAddress.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.hostMinAddress.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Host maksy-<br />malny:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">{this.state.hostMaxAddress.decimal}</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">{this.state.hostMaxAddress.binary.toString().substring(0, this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8))}</span><span className="text-danger">{this.state.hostMaxAddress.binary.toString().substring(this.state.networkMask.number + Math.floor(this.state.networkMask.number / 8), 35)}</span></div>
                </div>
              </div>
              <h4 className="mb-3 text-primary">Podział sieci na podsieci</h4>
            </div>
            <div className="col-lg-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Ustawienia</span>
                <span className="badge bg-warning rounded-pill">Brak zmian</span>
              </h4>
              <div className="row">
                <div className="col">
                  <h5>Adres IP hosta:</h5>
                  <div className="row pb-4 gy-2 d-flex align-items-center">
                    <div className="col-xs-12 col-sm-5 col-lg-12">
                      <div>Zapis dziesiętny:</div>
                      <div><input name="ip-address-decimal" className="form-control bg-secondary text-white" type="text" value={this.state.ipAddress.decimal} onChange={e => this.updateSettings('ip-address-decimal', e.target.value, this.state.networkMask.number)} /></div>
                    </div>
                    <div className="col-xs-12 col-sm-7 col-lg-12">
                      <div>Zapis binarny:</div>
                      <div><input name="ip-address-binary" className="form-control bg-secondary text-white" type="text" value={this.state.ipAddress.binary} onChange={e => this.updateSettings('ip-address-binary', e.target.value, this.state.networkMask.number)} /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h5>Maska sieciowa:</h5>
                  <div className="row pb-4 gy-2 d-flex align-items-center">
                    <div className="col-xs-12 col-sm-5 col-lg-12">
                      <div>Zapis dziesiętny:</div>
                      <div>
                        <select name="network-mask-decimal" className="form-control bg-secondary text-white" value={this.state.networkMask.number} onChange={e => this.updateSettings('ip-address-decimal', this.state.ipAddress.decimal, e.target.value)}>
                          {this.createSelectItemsDecimal()}
                        </select>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-7 col-lg-12">
                      <div>Zapis binarny:</div>
                      <div>
                        <select name="network-mask-binary" className="form-control bg-secondary text-white" value={this.state.networkMask.number} onChange={e => this.updateSettings('ip-address-decimal', this.state.ipAddress.decimal, e.target.value)}>
                          {this.createSelectItemsBinary()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col gy-3 d-grid">
                  <button type="button" className="btn btn-primary btn-lg" onClick={this.makeCalculations}>Wykonaj obliczenia</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  };
}
