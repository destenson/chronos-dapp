import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../../lib/consts';
import web3Config from '../../lib/web3Utils';
import AbstractStep from '../AbstractStep';
import StepLayout from '../StepLayout';
import { DEBT_CONTRACT_LABELS } from "../../lib/consts";
import {showError,showInfo,confirmProcess} from "../../lib/alerts";
import {Boxloader} from '../../lib/loader';

const ContractData = data => {
    const explorer = data.explorer;
    const addressFields = ['address','borrower','lender'];
    data = data.data;
    let Data = [],
        index = 0;
    for(let d in data){
        if(typeof DEBT_CONTRACT_LABELS[d] === 'undefined')
            continue;
        if(addressFields.indexOf(d) > -1)
            Data.push(<div className={'col col-3'} key={d}>
                <label className="label">{DEBT_CONTRACT_LABELS[d]+' : '}</label>
                <p className='' >
                    <a target="_blank" href={explorer+'address/'+data[d]}>
                        { data[d] }
                    </a>
                </p>
            </div>);
        else
            Data.push(<div className={'col col-3'} key={d}>
                <label className="label">{DEBT_CONTRACT_LABELS[d]+' : '}</label>
                <p className='' >{ String(data[d]) }</p>
            </div>);
        index++;
    }
    return (Data);
}

import {Propagatesloader} from "../../lib/loader";

@inject('web3Service')
@inject('store')
@observer
export default class Step5 extends AbstractStep {
    constructor(props) {
        super('DEBT_WATCH', 'debt', props);
        this.fundLoan = this.fundLoan.bind(this);
        this.refundLoan = this.refundLoan.bind(this);
        this.updateInterest = this.updateInterest.bind(this);
        this.scheduleUpdate = this.scheduleUpdate.bind(this);
    }

    @observable
    _state = {
        loadingData: true,
        loadinghistoryData: true,
        contractInstance:{},
        deploymentData:{},
        allocationHistory:{},
        funded:'',
        refunded:'',
        //lender:false,
        //borrower:false,
        update:'',
        updateFetcher:''

    }

    componentWillMount() {
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    async componentDidMount(){
        await this.loadInfo();
    }

    async fetchUpdates(delay){
        if(!this._ismounted)
            return;

        const that = this;

        if(!delay){
            console.log('updating...')
            const newContract = this._state.contractInstance.address;
            this.fetchContractData(newContract);
            await this.isLoanRefunded();
        }

        this.setState(Object.assign(that._state,{updateFetcher: setTimeout( ()=>{
            that.fetchUpdates();
        }, 10000)
        }));
    }

    async loadInfo(){
        const {props:{store,web3Service}} =  this;
        let {query:{newContract,transactionHash}} = Router;

        if(!newContract && !transactionHash)
            return false;

        await web3Service.awaitInitialized();
        if(newContract){
            this.setState( Object.assign(this._state.contractInstance,{address:newContract}) );
            await this.fetchContractData(newContract);
        }
        if(transactionHash){
            await this.fetchDeploymentData(transactionHash);
        }
        await this.isLoanRefunded();
        ReactTooltip.rebuild();
        this.fetchUpdates(true);
    }

    async fetchDeploymentData (transaction){
        const {web3Service} = this.props;
        this.setState( Object.assign(this._state.deploymentData,{transactionHash:transaction}) );
        const data = await web3Service.getDeploymentData(transaction);
        this.setState( Object.assign(this._state,{deploymentData:data}) );
    }

    isBorrower(){
        const {web3Service:{web3}} =  this.props;
        const isBorrower =  (web3.eth.defaultAccount.toLowerCase() == this._state.contractInstance.borrower.toLowerCase());
        return isBorrower;
    }

    isLender(){
        const {web3Service:{web3}} =  this.props;
        const isLender =  (web3.eth.defaultAccount.toLowerCase() == this._state.contractInstance.lender.toLowerCase());
        return isLender;
    }

    async fundLoan(event){
        const {target} = event;
        const {web3Service} =  this.props;
        const amt = await web3Service.fetchLoanValue(this._state.contractInstance.address,true);
        const prompt = await confirmProcess('Fund Loan',`Funding loan worth ${web3Service.finePrint(web3Service.convertEtherToWei(amt,true))} ETH`);
        if(!prompt)
            return;
        target.disabled = true;
        try{
            const funded = await web3Service.fundLoan(this._state.contractInstance.address,amt);
            showInfo('Loan Funded', ` ${funded}`);
            this.setState( Object.assign(this._state,{funded:true}) );
        }
        catch(e){
            target.disabled = true;
            showError('Loan Funding Failed');
            console.error(e);
        }
    }

    async refundLoan(event){
        const {target} = event;
        const {web3Service} =  this.props;
        const amt = await web3Service.fetchLoanValue(this._state.contractInstance.address,false);
        const prompt = await confirmProcess('Refund Loan',`Refunding loan and accrued interest worth ${web3Service.finePrint(web3Service.convertEtherToWei(amt,true))} ETH`);
        if(!prompt)
            return;
        target.disabled = true;
        try{
            const refunded = await web3Service.refundLoan(this._state.contractInstance.address,amt);
            showInfo('Loan Refunded', ` ${refunded}`);
            this.setState( Object.assign(this._state,{refunded:true}) );
        }
        catch(e){
            target.disabled = true;
            showError('Loan Refunding Failed');
            console.error(e);
        }
    }

    async updateInterest(){
        const {web3Service} =  this.props;
        const updated = await web3Service.updateInterest(this._state.contractInstance.address);
        showInfo('Interest tokens Minted!!!', ` ${updated}`);
        this.setState( {update: updated} );
    }

    async scheduleUpdate(){
        await showInfo('Coming Soon !!!','Stay tuned to the blog to know when this is available');
        return;
    }

    async fetchContractData (contractAddress){
        const {web3Service} = this.props;
        const data = await web3Service.getContractData(contractAddress);
        this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false}) );
    }

    async awaitMined (transaction){
        const {web3Service} = this.props;
        const mined = await web3Service.trackTransaction(transaction);
        return mined;
    }

    async isLoanRefunded (){
        const {web3Service} = this.props;
        const isRefunded = await web3Service.isLoanRefunded(this._state.contractInstance.address);
        this.setState( Object.assign(this._state,{refunded:isRefunded}) );
    }

    async checkConfirmations (transaction){
        const {web3Service} = this.props;
        const confirmations = await web3Service.fetchConfirmations(transaction);
        console.log(confirmations)
        if(confirmations < 1 )
            return await this.checkConfirmations(transaction);
        else{
            this.setState( Object.assign(this._state,{loadingData:true}) );
            return confirmations;
        }
    }

    goNext = () => {
        throw new Error('No passage here!!!');
    };


    render() {
        const {web3Service,store} = this.props;
        const EXPLORER = web3Config[this.activeApp][web3Service.network].EXPLORER;

        return(
            <StepLayout
                activeApp={ this.activeApp}
                activeStepKey={this.activeStepKey}
                onNext={this.goNext}
                nextTitle={null}
                web3Disabled={this.web3Disabled(web3Service) || this._state.notReady}
            >
                <div>
                    {(this._state.loadingData || !this._state.contractInstance ) &&
                    <div className="steps-content bottom-margin">
                        <div className="input-block-container center text-center">
                            <Propagatesloader {...{color:'#123abc',loading: true, size:16,msg:'loading Contract data ...'}}/>
                        </div>

                        <div className="input-block-container value center text-center">
                            <label className="label">Contract :</label>
                            {this._state.contractInstance && this._state.contractInstance.address &&
                            <a target="_blank" href={EXPLORER+'/address/'+this._state.contractInstance.address}>
                                {this._state.contractInstance.address}
                            </a>
                            }
                        </div>
                    </div>
                    }
                    {!this._state.loadingData && this._state.contractInstance &&
                    <div>
                        <div className="input-block-container center text-center">
                            <button className="button button_btn button_mullayer space_right greyed min-centered-button" onClick={this.updateInterest} disabled={!this._state.contractInstance.isLoanFunded || this._state.contractInstance.isInterestStatusUpdated}>UPDATE INTEREST</button>
                            <button className="button button_btn button_mullayer space_left greyed min-centered-button" onClick={this.scheduleUpdate} disabled={!this._state.contractInstance.isLoanFunded}>SCHEDULE UPDATE</button>
                        </div>
                        <div className="steps-content contract_info">
                            <ContractData {...{data:this._state.contractInstance,explorer:EXPLORER}} />
                            <div className='contract_clear bottom-margin'></div>
                            <div className='buttons'>
                                { this._state.contractInstance && this.isBorrower() &&
                                <button className="button button_fill button_mullayer" onClick={this.refundLoan} disabled={!this._state.contractInstance.isLoanFunded || this._state.isLoanRefunded} >
                                    ReFund
                                </button>
                                }
                                { this._state.contractInstance && this.isLender() &&
                                <button className="button button_fill button_mullayer" onClick={this.fundLoan} disabled={this._state.contractInstance.isLoanFunded || Number(this._state.contractInstance.loanActivation) > 0} >
                                    Fund
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </StepLayout>

        )
    }
}