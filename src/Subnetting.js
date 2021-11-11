import React, { Component } from 'react';

export class Subnetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subnets: [
        {id: '0',
        subnetsAmount: '1',
        hostsAmount: '254',
        list: [
          {id: '0',
          subnetAddress:
            {decimal: '5.206.252.0',
            binary: '11010010.11111010.00100110.00011101'},
          subnetMask: {
            number: '24',
            decimal: '5.206.252.0',
            binary: '11010010.11111010.00100110.00011101'}},
          {id: '1',
          subnetAddress:
            {decimal: '8.26.62.90',
            binary: '11010010.11111010.00100110.00011101'},
          subnetMask: {
            number: '25',
            decimal: '5.206.252.0',
            binary: '11010010.11111010.00100110.00011101'}}
        ]}
      ]
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ipAddressBinary !== this.props.ipAddressBinary || prevProps.networkMaskNumber !== this.props.networkMaskNumber) {
      let subnetsObject = {}, subnetsArray = [], subnetsListObject = {}, subnetsListArray = [];
      let ipAddressBinary = this.props.ipAddressBinary;
      let networkMaskNumber = this.props.networkMaskNumber;
      let ipAddressBinaryOctets = ipAddressBinary.split('.');
      let ipAddressBinaryText = ipAddressBinaryOctets.join('');
      let ipAddressFirstPartBinaryText = ipAddressBinaryText.substring(0, parseInt(networkMaskNumber));
      let subnetAddressBinaryText;
      let subnetsAmount, hostsAmount;
      let subnetAddressBinaryOctets, subnetAddressDecimalOctets, subnetAddressBinary, subnetAddressDecimal;
      for (let loop = networkMaskNumber; loop <= 30; loop++) {
        for (let loop2 = networkMaskNumber; loop2 <= loop; loop2++) {
          subnetAddressBinaryText = '';
          subnetAddressBinaryText = ipAddressFirstPartBinaryText.padEnd(loop2, '1');
          subnetAddressBinaryText = subnetAddressBinaryText.padEnd(32, '0');
          subnetAddressBinaryOctets = [subnetAddressBinaryText.substring(0, 8), subnetAddressBinaryText.substring(8, 16), subnetAddressBinaryText.substring(16, 24), subnetAddressBinaryText.substring(24)];
          subnetAddressDecimalOctets = subnetAddressBinaryOctets.map(octet => parseInt(octet, 2));
          subnetAddressBinary = subnetAddressBinaryOctets.join('.');
          subnetAddressDecimal = subnetAddressDecimalOctets.join('.');
          subnetsListObject = {
            id: loop + '.' + loop2,
            subnetAddress:
              {decimal: subnetAddressDecimal,
              binary: subnetAddressBinary},
            subnetMask: {
              number: loop2,
              decimal: '0.0.0.0',
              binary: '00000000.00000000.00000000.00000000'}
          };
          subnetsListArray.push(subnetsListObject);
        }
        subnetsAmount = Math.pow(2, loop - networkMaskNumber);
        hostsAmount = Math.pow(2, 32 - loop) - 2;
        subnetsObject = {
          id: loop,
          subnetsAmount: subnetsAmount,
          hostsAmount: hostsAmount,
          list: subnetsListArray
        };
        subnetsArray.push(subnetsObject);
        subnetsListArray = [];
      }
      this.setState({
        subnets: subnetsArray
      });
    }
  }
  render() {
    return (
      this.state.subnets.map(item =>
        <div key={item.id} className="row pb-4 gy-2 d-flex">
          <div className="col-sm-3 col-md-2">
            <h5>{(item.subnetsAmount > 1) ? item.subnetsAmount + ' podsieci' : item.subnetsAmount + ' podsieć'}</h5>
          </div>
          <div className="col-sm-6 col-md-7">
            <div><span className="text-info">1</span>&nbsp;podsieć z&nbsp;<span className="text-info">253</span> adresami IP możliwymi do wykorzystania z&nbsp;<span className="text-info">255</span> dostępnych (wykorzystanie <span className="text-info">95,94%</span>)</div>
            <div><span className="text-info">0</span>&nbsp;podsieci efektywnych z&nbsp;<span className="text-info">253</span> adresami IP możliwymi do wykorzystania z&nbsp;<span className="text-info">255</span> dostępnych (wykorzystanie <span className="text-info">95,94%</span>)</div>
            <div><span className="text-info">{item.hostsAmount}</span>&nbsp;hostów możliwych do wykorzystania w każdej z&nbsp;podsieci</div>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Lista podsieci:</div>
            {item.list.map(subitem => {
              return (
                <div key={subitem.id}>{subitem.subnetAddress.decimal} / {subitem.subnetMask.number}</div>
              )
            })}
          </div>
        </div>
      )
    )
  };
}
