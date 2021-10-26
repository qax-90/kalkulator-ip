import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: {decimal: 0, binary: 0},
      networkMask: { decimal: 0, binary: 0 }
    }
  }
  updateIpAddress = (event) => {
    if (event.target.getAttribute('name') === 'ip-address-decimal') {
      var decimalOctets = event.target.value.split('.');
      var binaryOctets = decimalOctets.map(octet => (octet >>> 0).toString(2).padStart(8, '0'));
    } else if (event.target.getAttribute('name') === 'ip-address-binary') {
      var binaryOctets = event.target.value.split('.');
      var decimalOctets = binaryOctets.map(octet => parseInt(octet, 2));
    }
    this.setState({ ipAddress: {decimal: decimalOctets.join('.'), binary: binaryOctets.join('.')} });
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
      if (i === 24) items.push(<option key={i} value={i} selected>/{i} aka {decimalText}</option>);
      else items.push(<option key={i} value={i}>/{i} aka {decimalText}</option>);
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
      if (i === 24) items.push(<option key={i} value={i} selected>/{i} aka {binaryText}</option>);
      else items.push(<option key={i} value={i}>/{i} aka {binaryText}</option>);
    }
    return items;
}
  makeCalculations = () => {
    console.log(this.state.ipAddress);
  }
  /*updateNetworkMaskText = (event) => {
    this.setState({ networkMask: [{decimal: 1, binary: 1}, {decimal: 0, binary: 1}, {decimal: 0, binary: 0}, {decimal: 0, binary: 1}] });
  }*/
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
                  <div>22.98.129.21</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>00110111.00010111.00110010.00110011</div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Maska sieciowa:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div><span className="text-info">255</span>.<span className="text-info">255</span>.<span className="text-info">255</span>.<span className="text-info">255</span></div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div><span className="text-success">11111111</span>.<span className="text-success">11111111</span>.<span className="text-success">11111111</span>.<span className="text-danger">00000000</span></div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Adres sieci:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div>22.98.129.0</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>11111111.11111111.11111111.00000000</div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Adres rozgło-<br />szeniowy:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div>22.98.129.255</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>00000000.00000000.00000000.11111111</div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Liczba hostów:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div>255</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>11111111</div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Host mini-<br />malny:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div>255</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>11111111</div>
                </div>
              </div>
              <div className="row pb-4 gy-2 d-flex align-items-center">
                <div className="col-sm-2 col-md-3">
                  <h5>Host maksy-<br />malny:</h5>
                </div>
                <div className="col-sm-3 col-md-3">
                  <div>Zapis dziesiętny:</div>
                  <div>255</div>
                </div>
                <div className="col-sm-7 col-md-6">
                  <div>Zapis binarny:</div>
                  <div>11111111</div>
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
                      <div><input name="ip-address-decimal" className="form-control bg-secondary text-white" type="text" value={this.state.ipAddress.decimal} onChange={this.updateIpAddress} /></div>
                    </div>
                    <div className="col-xs-12 col-sm-7 col-lg-12">
                      <div>Zapis binarny:</div>
                      <div><input name="ip-address-binary" className="form-control bg-secondary text-white" type="text" value={this.state.ipAddress.binary} onChange={this.updateIpAddress} /></div>
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
                        <select name="network-mask-decimal" className="form-control bg-secondary text-white">
                          {this.createSelectItemsDecimal()}
                        </select>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-7 col-lg-12">
                      <div>Zapis binarny:</div>
                      <div>
                        <select name="network-mask-binary" className="form-control bg-secondary text-white">
                          {this.createSelectItemsBinary()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={this.makeCalculations}>Wykonaj obliczenia</button>
            </div>
          </div>
        </main>
      </div>
    )
  };
}
