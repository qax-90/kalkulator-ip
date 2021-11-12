import React, { Component } from 'react';
import axios from 'axios';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddressDefault: {decimal: '', binary: ''},
      networkMaskDefault: {number: ''},
      ipAddressInput: {decimal: '', binary: ''},
      networkMaskSelect: {number: ''},
      ownIp: {className: 'badge rounded-pill bg-success', text: 'Twój adres IP'}
    };
    this.getTodos = this.getTodos.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }
  async getTodos() {
    var ipAddressDecimal;
    await axios.get('https://api.ipify.org').then(function(response) {
      ipAddressDecimal = response.data;
    }).catch(function(error) {
      ipAddressDecimal = '0.0.0.0';
    });
    let ipAddressDecimalOctets = ipAddressDecimal.split('.');
    let ipAddressBinaryOctets = ipAddressDecimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
    let ipAddressBinary = ipAddressBinaryOctets.join('.');
    this.setState({ ipAddressDefault: {decimal: ipAddressDecimal, binary: ipAddressBinary}, networkMaskDefault: {number: 24}, ipAddressInput: {decimal: ipAddressDecimal, binary: ipAddressBinary}, networkMaskSelect: {number: '24'} });
    this.computePrimaryNetworkParams(ipAddressDecimalOctets, ipAddressBinaryOctets, 24);
  }
  restoreOwnIp = () => {
    let ipAddressDecimal = this.state.ipAddressDefault.decimal;
    let ipAddressBinary = this.state.ipAddressDefault.binary;
    let ipAddressDecimalOctets = ipAddressDecimal.split('.');
    let ipAddressBinaryOctets = ipAddressBinary.split('.');
    this.setState({ ipAddressInput: {decimal: ipAddressDecimal, binary: ipAddressBinary} });
    this.computePrimaryNetworkParams(ipAddressDecimalOctets, ipAddressBinaryOctets, this.state.networkMaskSelect.number);
  }
  generateRandomIp = () => {
    let ipAddressDecimalOctets = [];
    let ipAddressBinaryOctets = [];
    for (let loop = 0; loop < 4; loop++) {
      ipAddressDecimalOctets[loop] = Math.floor(Math.random() * 256);
      ipAddressBinaryOctets = ipAddressDecimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
    }
    let ipAddressDecimal = ipAddressDecimalOctets.join('.');
    let ipAddressBinary = ipAddressBinaryOctets.join('.');
    this.setState({ ipAddressInput: {decimal: ipAddressDecimal, binary: ipAddressBinary} });
    this.computePrimaryNetworkParams(ipAddressDecimalOctets, ipAddressBinaryOctets, this.state.networkMaskSelect.number);
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
    let ipAddressDecimalOctets = [], ipAddressBinaryOctets = [], ipAddressDecimalOctetsInput = [], ipAddressBinaryOctetsInput = [];
    let decimalOctets = [], ipAddressDecimalInput, ipAddressBinaryInput;
    if (ipAddressType === 'ip-address-decimal') {
      ipAddressDecimalOctetsInput = ipAddress.split('.');
      decimalOctets[0] = ((typeof ipAddressDecimalOctetsInput[0] !== 'undefined' && !isNaN(ipAddressDecimalOctetsInput[0]) && parseInt(ipAddressDecimalOctetsInput[0]) >= 0 && parseInt(ipAddressDecimalOctetsInput[0]) <= 255) ? Number(ipAddressDecimalOctetsInput[0]) : 0);
      decimalOctets[1] = ((typeof ipAddressDecimalOctetsInput[1] !== 'undefined' && !isNaN(ipAddressDecimalOctetsInput[1]) && parseInt(ipAddressDecimalOctetsInput[1]) >= 0 && parseInt(ipAddressDecimalOctetsInput[1]) <= 255) ? Number(ipAddressDecimalOctetsInput[1]) : 0);
      decimalOctets[2] = ((typeof ipAddressDecimalOctetsInput[2] !== 'undefined' && !isNaN(ipAddressDecimalOctetsInput[2]) && parseInt(ipAddressDecimalOctetsInput[2]) >= 0 && parseInt(ipAddressDecimalOctetsInput[2]) <= 255) ? Number(ipAddressDecimalOctetsInput[2]) : 0);
      decimalOctets[3] = ((typeof ipAddressDecimalOctetsInput[3] !== 'undefined' && !isNaN(ipAddressDecimalOctetsInput[3]) && parseInt(ipAddressDecimalOctetsInput[3]) >= 0 && parseInt(ipAddressDecimalOctetsInput[3]) <= 255) ? Number(ipAddressDecimalOctetsInput[3]) : 0);
      ipAddressBinaryOctets[0] = (decimalOctets[0] >>> 0).toString(2).padStart(8, '0');
      ipAddressBinaryOctets[1] = (decimalOctets[1] >>> 0).toString(2).padStart(8, '0');
      ipAddressBinaryOctets[2] = (decimalOctets[2] >>> 0).toString(2).padStart(8, '0');
      ipAddressBinaryOctets[3] = (decimalOctets[3] >>> 0).toString(2).padStart(8, '0');
      ipAddressDecimalOctets = ipAddressBinaryOctets.map(octet => parseInt(octet, 2));
      ipAddressBinaryInput = ipAddressBinaryOctets.join('.');
      this.setState({ ipAddressInput: {decimal: ipAddress, binary: ipAddressBinaryInput}, networkMaskSelect: {number: networkMask} });
    } else if (ipAddressType === 'ip-address-binary') {
      ipAddressBinaryOctetsInput = ipAddress.split('.');
      decimalOctets[0] = ((typeof ipAddressBinaryOctetsInput[0] !== 'undefined' && !isNaN(ipAddressBinaryOctetsInput[0])) ? parseInt(ipAddressBinaryOctetsInput[0], 2) : 0);
      decimalOctets[1] = ((typeof ipAddressBinaryOctetsInput[1] !== 'undefined' && !isNaN(ipAddressBinaryOctetsInput[1])) ? parseInt(ipAddressBinaryOctetsInput[1], 2) : 0);
      decimalOctets[2] = ((typeof ipAddressBinaryOctetsInput[2] !== 'undefined' && !isNaN(ipAddressBinaryOctetsInput[2])) ? parseInt(ipAddressBinaryOctetsInput[2], 2) : 0);
      decimalOctets[3] = ((typeof ipAddressBinaryOctetsInput[3] !== 'undefined' && !isNaN(ipAddressBinaryOctetsInput[3])) ? parseInt(ipAddressBinaryOctetsInput[3], 2) : 0);
      ipAddressDecimalOctets[0] = ((decimalOctets[0] >= 0 && decimalOctets[0] <= 255) ? Number(decimalOctets[0]) : 0);
      ipAddressDecimalOctets[1] = ((decimalOctets[1] >= 0 && decimalOctets[1] <= 255) ? Number(decimalOctets[1]) : 0);
      ipAddressDecimalOctets[2] = ((decimalOctets[2] >= 0 && decimalOctets[2] <= 255) ? Number(decimalOctets[2]) : 0);
      ipAddressDecimalOctets[3] = ((decimalOctets[3] >= 0 && decimalOctets[3] <= 255) ? Number(decimalOctets[3]) : 0);
      ipAddressBinaryOctets = ipAddressDecimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
      ipAddressDecimalInput = ipAddressDecimalOctets.join('.');
      this.setState({ ipAddressInput: {decimal: ipAddressDecimalInput, binary: ipAddress}, networkMaskSelect: {number: networkMask} });
    }
    this.computePrimaryNetworkParams(ipAddressDecimalOctets, ipAddressBinaryOctets, networkMask);
  }
  computePrimaryNetworkParams = (ipAddressDecimalOctets, ipAddressBinaryOctets, networkMask) => {
    let ipInfoClassName, ipInfoText;
    if (ipAddressDecimalOctets.join('.') === this.state.ipAddressDefault.decimal) {
      ipInfoClassName = 'badge rounded-pill bg-success';
      ipInfoText = 'Twój adres IP';
    } else {
      ipInfoClassName = 'badge rounded-pill bg-warning';
      ipInfoText = 'Obcy adres IP';
    }
    this.setState({ ownIp: {className: ipInfoClassName, text: ipInfoText} });
    this.props.callback(ipAddressDecimalOctets, ipAddressBinaryOctets, networkMask);
  }
  render() {
    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Ustawienia</span>
          <span className={this.state.ownIp.className}>{this.state.ownIp.text}</span>
        </h4>
        <div className="row">
          <div className="col">
            <h5>Adres IP hosta:</h5>
            <div className="row pb-4 gy-2 d-flex align-items-center">
              <div className="col-md-5 col-lg-12">
                <div>Zapis dziesiętny:</div>
                <div><input className="form-control bg-secondary text-white" type="text" value={this.state.ipAddressInput.decimal} onChange={e => this.updateSettings('ip-address-decimal', e.target.value, this.props.networkMaskNumber)} /></div>
              </div>
              <div className="col-md-7 col-lg-12">
                <div>Zapis binarny:</div>
                <div><input className="form-control bg-secondary text-white" type="text" value={this.state.ipAddressInput.binary} onChange={e => this.updateSettings('ip-address-binary', e.target.value, this.props.networkMaskNumber)} /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>Maska sieciowa:</h5>
            <div className="row pb-4 gy-2 d-flex align-items-center">
              <div className="col-md-5 col-lg-12">
                <div>Zapis dziesiętny:</div>
                <div>
                  <select className="form-control bg-secondary text-white" value={this.state.networkMaskSelect.number || '24'} onChange={e => this.updateSettings('ip-address-decimal', this.props.ipAddressDecimal, e.target.value)}>
                    {this.createSelectItemsDecimal()}
                  </select>
                </div>
              </div>
              <div className="col-md-7 col-lg-12">
                <div>Zapis binarny:</div>
                <div>
                  <select className="form-control bg-secondary text-white" value={this.state.networkMaskSelect.number || '24'} onChange={e => this.updateSettings('ip-address-decimal', this.props.ipAddressDecimal, e.target.value)}>
                    {this.createSelectItemsBinary()}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col gy-3 d-grid">
            <button type="button" className="btn btn-primary btn-lg" onClick={this.restoreOwnIp}>Przywróć własny adres IP</button>
          </div>
        </div>
        <div className="row">
          <div className="col gy-3 d-grid">
            <button type="button" className="btn btn-primary btn-lg" onClick={this.generateRandomIp}>Generuj losowy adres IP</button>
          </div>
        </div>
      </div>
    )
  }
}
