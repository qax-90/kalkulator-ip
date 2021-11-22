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
      ],
      detailedSubnetIndex: '',
      showModalWindow: 'hidden'
    };
  }
  binaryIncrease = (number, length) => {
  	let outputNumber = '';
    let inputNumber = number.padStart(length, '0');
  	for (let loop = inputNumber.length - 1; loop >= 0; loop--) {
    	if (inputNumber.charAt(loop) === '0') {
      	outputNumber = inputNumber.substring(0, loop) + '1' + inputNumber.substring(loop + 2);
        break;
      } else if (inputNumber.charAt(loop) === '1') {
      	if (loop === 0) {
        	outputNumber = outputNumber.padEnd(length, '1');
        	break;
        }
      	if (inputNumber.charAt(loop - 1) === '0') {
          outputNumber = inputNumber.substring(0, loop - 1) + '1';
          outputNumber = outputNumber.padEnd(length, '0');
          break;
        } else if (inputNumber.charAt(loop - 1) === '1') {
        	continue;
        }
      }
  	}
    return outputNumber;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ipAddressBinary !== this.props.ipAddressBinary || prevProps.networkMaskNumber !== this.props.networkMaskNumber) {
      let subnetsObject = {}, subnetsArray = [], subnetsListObject = {}, subnetsListArray = [];
      let ipAddressBinary = this.props.ipAddressBinary;
      let networkMaskNumber = this.props.networkMaskNumber;
      if (networkMaskNumber < 10) {
        let promptAnswer = window.confirm('Podział sieci o masce mniejszej niż /10 na podsieci  wymaga sporej mocy obliczeniowej od Twojego komputera. W przypadku niepowodzenia może dojść do zawieszenia się Twojej przeglądarki internetowej! Czy chcesz mimo to wykonać podział sieci o masce /' + networkMaskNumber + ' na podsieci?');
        if (!promptAnswer) networkMaskNumber = 32;
      }
      let ipAddressBinaryOctets = ipAddressBinary.split('.');
      let ipAddressBinaryText = ipAddressBinaryOctets.join('');
      let ipAddressFirstPartBinaryText = ipAddressBinaryText.substring(0, parseInt(networkMaskNumber));
      let ipAddressMiddlePartBinaryText;
      let subnetAddressBinaryText, subnetMaskBinaryText;
      let subnetsAmount, hostsAmount;
      let subnetAddressBinaryOctets, subnetAddressDecimalOctets, subnetAddressBinary, subnetAddressDecimal, subnetMaskBinaryOctets, subnetMaskDecimalOctets, subnetMaskBinary, subnetMaskDecimal;
      for (let loop = networkMaskNumber; loop <= 30; loop++) {
        subnetsAmount = Math.pow(2, loop - networkMaskNumber);
        hostsAmount = Math.pow(2, 32 - loop) - 2;
        subnetMaskBinaryText = '';
        ipAddressMiddlePartBinaryText = '';
        ipAddressMiddlePartBinaryText = ipAddressMiddlePartBinaryText.padEnd(loop - networkMaskNumber, '0');
        for (let loop2 = 1; loop2 <= subnetsAmount; loop2++) {
          subnetAddressBinaryText = ipAddressFirstPartBinaryText + ipAddressMiddlePartBinaryText;
          subnetAddressBinaryText = subnetAddressBinaryText.padEnd(32, '0');
          subnetMaskBinaryText = subnetMaskBinaryText.padStart(loop, '1');
          subnetMaskBinaryText = subnetMaskBinaryText.padEnd(32, '0');
          subnetAddressBinaryOctets = [subnetAddressBinaryText.substring(0, 8), subnetAddressBinaryText.substring(8, 16), subnetAddressBinaryText.substring(16, 24), subnetAddressBinaryText.substring(24)];
          subnetAddressDecimalOctets = subnetAddressBinaryOctets.map(octet => parseInt(octet, 2));
          subnetAddressBinary = subnetAddressBinaryOctets.join('.');
          subnetAddressDecimal = subnetAddressDecimalOctets.join('.');
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
              number: loop,
              decimal: subnetMaskDecimal,
              binary: subnetMaskBinary
            }
          };
          subnetsListArray.push(subnetsListObject);
          ipAddressMiddlePartBinaryText = this.binaryIncrease(ipAddressMiddlePartBinaryText, loop - networkMaskNumber);
        }
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
  toggleModalWindow = (subnetId) => {
    if (subnetId) {
      let subnetIndex = this.state.subnets.findIndex((element) => element.id === subnetId);
      this.setState( {detailedSubnetIndex: subnetIndex, showModalWindow: 'shown'} );
    } else {
      this.setState( {detailedSubnetIndex: '', showModalWindow: 'hidden'} );
    }
  }
  generateOtherSubnetsContent = () => {
    let subnetObject = this.state.subnets[this.state.detailedSubnetIndex];
    if (typeof subnetObject !== 'undefined') {
      if (this.state.detailedSubnetIndex !== '') {
        let subnetList = subnetObject.list;
        return (<>
          <div>Sieć {this.props.networkAddressDecimal} podzielona na {this.state.subnets[this.state.detailedSubnetIndex].subnetsAmount} podsieci:</div>{subnetList.map(item => <span key={item.id} title={'Adres sieci dziesiętnie: ' + item.subnetAddress.decimal + '\r\nAdres sieci binarnie: ' + item.subnetAddress.binary + '\r\nMaska sieciowa skrótowo: /' + item.subnetMask.number + '\r\nMaska sieciowa dziesiętnie: ' + item.subnetMask.decimal + '\r\nMaska sieciowa binarnie: ' + item.subnetMask.binary}>{item.subnetAddress.decimal}&nbsp;/{item.subnetMask.number}</span> )}</>
        )
      }
    }
  }
  render() {
    return (<>
      {this.state.subnets.map(item =>
        <div key={item.id} className="row pb-4 gy-2 d-flex">
          <div className="col-sm-3 col-md-2">
            <h5>{(item.subnetsAmount !== 1) ? item.subnetsAmount + ' podsieci' : item.subnetsAmount + ' podsieć'}</h5>
          </div>
          <div className="col-sm-6 col-md-7">
            <div><span className="text-info">{item.subnetsAmount}</span>&nbsp;{(item.subnetsAmount !== 1) ? 'podsieci' : 'podsieć'} &ndash; w&nbsp;sumie <span className="text-info">{item.hostsAmount * item.subnetsAmount}</span> adresów IP możliwych do wykorzystania z&nbsp;<span className="text-info">{(item.hostsAmount + 2) * item.subnetsAmount}</span> dostępnych (wykorzystanie <span className="text-danger">{(item.subnetsAmount > 0) ? (Math.floor(item.hostsAmount / (item.hostsAmount + 2) * 100000) / 1000).toString().replace('.', ',') + '%' : 'niemożliwe'}</span>)</div>
            <div><span className="text-info">{(item.subnetsAmount >= 2) ? (item.subnetsAmount - 2) : '0'}</span>&nbsp;{((item.subnetsAmount - 2) !== 1) ? 'podsieci efektywnych' : 'podsieć efektywna'} &ndash; w&nbsp;sumie <span className="text-info">{(item.subnetsAmount > 2) ? item.hostsAmount * (item.subnetsAmount - 2) : '0'}</span> adresów IP możliwych do wykorzystania z&nbsp;<span className="text-info">{(item.hostsAmount + 2) * item.subnetsAmount}</span> dostępnych (wykorzystanie <span className="text-danger">{(item.subnetsAmount > 2) ? (Math.floor((item.hostsAmount * (item.subnetsAmount - 2)) / ((item.hostsAmount + 2) * item.subnetsAmount) * 100000) / 1000).toString().replace('.', ',') + '%' : 'niemożliwe'}</span>)</div>
            <div><span className="text-info">{item.hostsAmount}</span>&nbsp;hostów możliwych do wykorzystania w każdej z&nbsp;podsieci</div>
          </div>
          <div className="col-sm-3 col-md-3">
            <div>Lista podsieci:</div>
            {item.list.slice(0, 32).map(subitem => {
              return (
                <div key={subitem.id} title={'Adres sieci dziesiętnie: ' + subitem.subnetAddress.decimal + '\r\nAdres sieci binarnie: ' + subitem.subnetAddress.binary + '\r\nMaska sieciowa skrótowo: /' + subitem.subnetMask.number + '\r\nMaska sieciowa dziesiętnie: ' + subitem.subnetMask.decimal + '\r\nMaska sieciowa binarnie: ' + subitem.subnetMask.binary}>{subitem.subnetAddress.decimal} / {subitem.subnetMask.number}</div>
              )
            })}
            <div>{(item.list.length > 32) ? <button type="button" className="btn btn-primary mt-2" onClick={e => this.toggleModalWindow(item.id)}> {('Zobacz ' + (item.list.length - 32) + ' pozostałe')} </button> : ''}</div>
          </div>
        </div>
      )}<div id="other-subnets" className={this.state.showModalWindow} onClick={e => this.toggleModalWindow(false)}>{this.generateOtherSubnetsContent()}</div></>
    )
  };
}
