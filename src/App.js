import React, { Component } from 'react';
import { PrimaryNetworkParams } from './PrimaryNetworkParams';
import { PrimaryNetworkParamsPartTwo } from './PrimaryNetworkParamsPartTwo';
import { Subnetting } from './Subnetting';
import { Settings } from './Settings';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: {decimal: '', binary: ''},
      networkMask: {number: '', decimal: '', binary: ''},
      networkAddress: {decimal: '', binary: ''},
      broadcastAddress: {decimal: '', binary: ''},
      hostsNumber: {number: '', binary: ''},
      hostMinAddress: {decimal: '', binary: ''},
      hostMaxAddress: {decimal: '', binary: ''},
    };
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
  computePrimaryNetworkParams = (ipAddressDecimalOctets, ipAddressBinaryOctets, networkMask) => {
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
    let broadcastAddressBinaryText = broadcastAddressFirstPartBinaryText.padEnd(32, '1');
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
    this.setState({ ipAddress: {decimal: ipAddressDecimal, binary: ipAddressBinary}, networkMask: {number: parseInt(networkMask), decimal: networkMaskDecimal, binary: networkMaskBinary}, networkAddress: {decimal: networkAddressDecimal, binary: networkAddressBinary}, broadcastAddress: {decimal: broadcastAddressDecimal, binary: broadcastAddressBinary}, hostsNumber: {number: (parseInt(networkMask) < 32) ? Math.floor(Math.pow(2, 32 - parseInt(networkMask)) - 2) : 0, binary: (parseInt(networkMask) < 32) ? (Math.floor(Math.pow(2, 32 - parseInt(networkMask)) - 2) >>> 0).toString(2) : ''}, hostMinAddress: {decimal: hostMinAddressDecimal, binary: hostMinAddressBinary}, hostMaxAddress: {decimal: hostMaxAddressDecimal, binary: hostMaxAddressBinary} });
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
              <PrimaryNetworkParams
              networkMaskNumber={this.state.networkMask.number}
              ipAddressDecimal={this.state.ipAddress.decimal}
              ipAddressBinary={this.state.ipAddress.binary}
              networkMaskDecimal={this.state.networkMask.decimal}
              networkMaskBinary={this.state.networkMask.binary}
              networkAddressDecimal={this.state.networkAddress.decimal}
              networkAddressBinary={this.state.networkAddress.binary}
              broadcastAddressDecimal={this.state.broadcastAddress.decimal}
              broadcastAddressBinary={this.state.broadcastAddress.binary} />
              <PrimaryNetworkParamsPartTwo
              networkMaskNumber={this.state.networkMask.number}
              hostsNumberNumber={this.state.hostsNumber.number}
              hostsNumberBinary={this.state.hostsNumber.binary}
              hostMinAddressDecimal={this.state.hostMinAddress.decimal}
              hostMinAddressBinary={this.state.hostMinAddress.binary}
              hostMaxAddressDecimal={this.state.hostMaxAddress.decimal}
              hostMaxAddressBinary={this.state.hostMaxAddress.binary} />
              <h4 className="mb-3 text-primary">Podział sieci na podsieci</h4>
              <Subnetting
              ipAddressBinary={this.state.ipAddress.binary}
              networkMaskNumber={this.state.networkMask.number} />
            </div>
            <div className="col-lg-4">
              <Settings
              ipAddressDecimal={this.state.ipAddress.decimal}
              networkMaskNumber={this.state.networkMask.number}
              callback={this.computePrimaryNetworkParams} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}
