import React, { Component } from 'react';

export class Subnetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subnets: [{
        id: '',
        subnetsAmount: '',
        hostsAmount: '',
        list: [{
          id: '',
          subnetAddress: {
            decimal: '',
            binary: ''
          },
          subnetMask: {
            number: '',
            decimal: '',
            binary: ''
          }}
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
      let subnetAddressBinaryText, subnetMaskBinaryText;
      let subnetsAmount, hostsAmount;
      let subnetAddressBinaryOctets, subnetAddressDecimalOctets, subnetAddressBinary, subnetAddressDecimal, subnetMaskBinaryOctets, subnetMaskDecimalOctets, subnetMaskBinary, subnetMaskDecimal;
      for (let loop = networkMaskNumber; loop <= 30; loop++) {
        for (let loop2 = networkMaskNumber; loop2 <= loop; loop2++) {
          subnetAddressBinaryText = '';
          subnetAddressBinaryText = ipAddressFirstPartBinaryText.padEnd(loop2, '1');
          subnetAddressBinaryText = subnetAddressBinaryText.padEnd(32, '0');
          subnetAddressBinaryOctets = [subnetAddressBinaryText.substring(0, 8), subnetAddressBinaryText.substring(8, 16), subnetAddressBinaryText.substring(16, 24), subnetAddressBinaryText.substring(24)];
          subnetAddressDecimalOctets = subnetAddressBinaryOctets.map(octet => parseInt(octet, 2));
          subnetAddressBinary = subnetAddressBinaryOctets.join('.');
          subnetAddressDecimal = subnetAddressDecimalOctets.join('.');
          subnetMaskBinaryText = '';
          subnetMaskBinaryText = subnetMaskBinaryText.padEnd(loop2, '1');
          subnetMaskBinaryText = subnetMaskBinaryText.padEnd(32, '0');
          subnetMaskBinaryOctets = [subnetMaskBinaryText.substring(0, 8), subnetMaskBinaryText.substring(8, 16), subnetMaskBinaryText.substring(16, 24), subnetMaskBinaryText.substring(24)];
          subnetMaskDecimalOctets = subnetMaskBinaryOctets.map(octet => parseInt(octet, 2));
          subnetMaskBinary = subnetMaskBinaryOctets.join('.');
          subnetMaskDecimal = subnetMaskDecimalOctets.join('.');
          subnetsListObject = {
            id: loop + '.' + loop2,
            subnetAddress: {
              decimal: subnetAddressDecimal,
              binary: subnetAddressBinary
            },
            subnetMask: {
              number: loop2,
              decimal: subnetMaskDecimal,
              binary: subnetMaskBinary
            }
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
            <h5>{(item.subnetsAmount !== 1) ? item.subnetsAmount + ' podsieci' : item.subnetsAmount + ' podsieć'}</h5>
          </div>
          <div className="col-sm-6 col-md-7">
            <div><span className="text-info">{item.subnetsAmount}</span>&nbsp;{(item.subnetsAmount !== 1) ? 'podsieci' : 'podsieć'} &ndash; każda z&nbsp;<span className="text-info">{item.hostsAmount * item.subnetsAmount}</span> adresami IP możliwymi do wykorzystania z&nbsp;<span className="text-info">{(item.hostsAmount + 2) * item.subnetsAmount}</span> dostępnych (wykorzystanie <span className="text-danger">{(item.subnetsAmount > 0) ? (Math.floor(item.hostsAmount / (item.hostsAmount + 2) * 100000) / 1000).toString().replace('.', ',') + '%' : 'niemożliwe'}</span>)</div>
            <div><span className="text-info">{(item.subnetsAmount >= 2) ? (item.subnetsAmount - 2) : '0'}</span>&nbsp;{((item.subnetsAmount - 2) !== 1) ? 'podsieci efektywnych' : 'podsieć efektywna'} &ndash; każda z&nbsp;<span className="text-info">{(item.subnetsAmount > 2) ? item.hostsAmount * (item.subnetsAmount - 2) : '0'}</span> adresami IP możliwymi do wykorzystania z&nbsp;<span className="text-info">{(item.hostsAmount + 2) * item.subnetsAmount}</span> dostępnych (wykorzystanie <span className="text-danger">{(item.subnetsAmount > 2) ? (Math.floor((item.hostsAmount * (item.subnetsAmount - 2)) / ((item.hostsAmount + 2) * item.subnetsAmount) * 100000) / 1000).toString().replace('.', ',') + '%' : 'niemożliwe'}</span>)</div>
            <div><span className="text-info">{item.hostsAmount}</span>&nbsp;hostów możliwych do wykorzystania w każdej z&nbsp;podsieci</div>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Lista podsieci:</div>
            {item.list.map(subitem => {
              return (
                <div key={subitem.id} title={'Adres sieci dziesiętnie: ' + subitem.subnetAddress.decimal + '\r\nAdres sieci binarnie: ' + subitem.subnetAddress.binary + '\r\nMaska sieciowa skrótowo: /' + subitem.subnetMask.number + '\r\nMaska sieciowa dziesiętnie: ' + subitem.subnetMask.decimal + '\r\nMaska sieciowa binarnie: ' + subitem.subnetMask.binary}>{subitem.subnetAddress.decimal} / {subitem.subnetMask.number}</div>
              )
            })}
          </div>
        </div>
      )
    )
  };
}