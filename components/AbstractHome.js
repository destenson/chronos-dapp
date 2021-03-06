import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../lib/consts';
import { confirmFeeWithdraw, showInsufficientBalalnce, showError, showInfo, showContractAddressRequest } from '../lib/alerts';

import web3Config from '../lib/web3Utils.js';



export default class AbstractHome extends Component {
  constructor(activeApp,props){
    super(props);

    this.state = {
      MIN_FEE:null,
      needsFaucet: false
    }


    this.activeApp = activeApp;
    this.getTestnetTokens = this.getTestnetTokens.bind(this);
    this.onWatch = this.onWatch.bind(this);
  }

  onStart = async (eventInst) => {
    if(this.web3Disabled() )
      return;
    var target = eventInst.target
    target.disabled = true;
    const { web3Service } = this.props;
    if(!await web3Service.checkBalance()){
      const preview = await showInsufficientBalalnce( (this.state.MIN_FEE/(1e+18)) );
      if(preview == 'preview')
        return this.start();
      else
        this.setState({needsFaucet:true});
        return target.disabled = false;
    }
    else{
      if (
        await web3Service.checkAllowance() ||
        (await confirmFeeWithdraw(this.state.MIN_FEE) && await this.reserveTokens())
      ) {
        this.start();
      }
      else
        target.disabled = false;
    }
  };

  async onWatch(destination){
    const val = await showContractAddressRequest();
    if(!val)
      return;
    return this.goWatch(val,destination);
  }

  async goWatch(hash,destination) {
    if(this.web3Disabled() )
      return;

    const { props: { web3Service } } = this;
    let watchPageData;
    const CONTRACT_PROPERTIES = ['transactionHash','newContract']
    try{
      watchPageData = await web3Service.prepareWatch(hash);
    }
    catch(e){
      console.error(e);
      return showError('Failed!!!. Kindly check your Input and Network connection')
    }

    let found;
    CONTRACT_PROPERTIES.forEach(p => {
      if(watchPageData[p] == hash)
        return found = true;
    });

    if(!found)
      return showError('Unable to retreive contract');

    const query = CONTRACT_PROPERTIES.reduce((result, name) => {
      result[name] = watchPageData[name];
      return result;
    }, {});

    Router.push({
      pathname: destination,
      query,
    });
  };

  async reserveTokens() {
    const { web3Service } = this.props;
    try {
      const result = await web3Service.approveFee();
      showInfo('Token Release Tx Status', ` ${result}`);
      this.start();
    } catch (err) {
      showError('Could not complete transaction');
    }
  }


  componentDidMount(){
      this.getWeb3Fee();
  }

  async getWeb3Fee(){
    const {web3Service} = this.props;
    const that = this;
    if( typeof web3Service.network !== 'undefined' && web3Service.network !== null)
      return this.setState({MIN_FEE: web3Config[this.activeApp][web3Service.network].MIN_FEE });
    setTimeout(function(){
      return that.getWeb3Fee();
    },200)
  }

  async getTestnetTokens (){
    const {web3Service} = this.props;
    try{
      const faucetTx = await web3Service.requestFromFaucet();
      if(faucetTx.status == -1)
        return showError(`Sorry the Faucet is not funded at the moment`);
      else if(faucetTx.status == 0)
        return showError(`You have to wait for another ${ (faucetTx.data/60).toFixed(2)} min(s) to request Tokens.`);
      showInfo('Token Faucet request Tx Status', ` ${faucetTx.data}`);
      this.setState({needsFaucet: false});
    }
    catch(e){
      console.error(e);
      showError('Error Requesting Faucet Tokens');
    }
  }

  web3Disabled (){
    const {web3Service} = this.props;
    return !web3Service.connectedToMetaMask || !(typeof web3Service.accounts !== 'undefined' && web3Service.accounts.length > 0) || !this.state.MIN_FEE
  }

  start() {
    throw new Error('Implement me');
  }

  render() {
    throw new Error('Override me');
  }
}
