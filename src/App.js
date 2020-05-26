import React from 'react';
import './App.scss';
import DataEntrySection from './DataEntrySection';
import SectionContentDeductionMode from './SectionContentDeductionMode';
import SectionContentDependants from './SectionContentDependants';
import SectionContentFilingStatus from './SectionContentFilingStatus';
import SectionContentW2 from './SectionContentW2';
import SectionContentOtherDeductions from './SectionContentOtherDeductions';
import TaxResultsContainer from './TaxResultsContainer';

import CONSTANTS from './constants';
import * as utils from './utils';
import * as logger from './logger';

import graphDataSetGenerator from './graphDataSetGenerator';
import taxModel2019 from './taxModel2019';


class App extends React.Component {

  constructor(props){
    super(props);
    this.taxModel = new taxModel2019();
    //set constants - in future they can be specified for each tax model year
    this.startScreenValue = this.taxModel.startScreenValue;
    this.endScreenValue = this.taxModel.endScreenValue;

    this.state = this.getInitialState();
    this.changeFilingStatus = this.changeFilingStatus.bind(this);
    this.changeDeductionMode = this.changeDeductionMode.bind(this);
    this.changeItemizedDeduction = this.changeItemizedDeduction.bind(this);    
    this.changeDependantsClaimStatus = this.changeDependantsClaimStatus.bind(this);
    this.changeNumberOfDependantChildren = this.changeNumberOfDependantChildren.bind(this);
    this.changeNumberOfDependantRelatives = this.changeNumberOfDependantRelatives.bind(this);
    this.changeWages = this.changeWages.bind(this);
    this.changeTaxWithhold = this.changeTaxWithhold.bind(this);
    this.changeWagesSpouse = this.changeWagesSpouse.bind(this);
    this.changeTaxWithholdSpouse = this.changeTaxWithholdSpouse.bind(this);
    this.changePreTaxDeductions = this.changePreTaxDeductions.bind(this);
    this.changeTaxCreditsDeductions = this.changeTaxCreditsDeductions.bind(this);
    this.changeOtherDeductionsStatus = this.changeOtherDeductionsStatus.bind(this);
    this.resetApp = this.resetApp.bind(this);
    //this.changeCurrentScreenValue = this.changeCurrentScreenValue.bind(this);
    this.calculateTaxes = this.calculateTaxes.bind(this);
    
    //initialize model
    this.taxModel.initFromState(this.state);
  }

  //method returning object used for setting initial state and reseting the app
  getInitialState(){
    return {
      filingStatus: CONSTANTS.FILING_STATUS_VALUE.SINGLE,
      deductionMode: CONSTANTS.DEDUCTION_MODE.STANDARD,
      //Need to use input value as String instead of number. This is because of React bug 9402->https://github.com/facebook/react/issues/9402
      numberOfDependantChildren: "0",       
      numberOfDependantRelatives: "0",  
      itemizedDeductionValue: "$0",
      wages: "$0",
      taxWithhold: "$0",
      wagesSpouse: "$0",
      taxWithholdSpouse: "$0",
      dependantsClaimStatus: CONSTANTS.DEPENDANTS_CLAIM_STATUS.NO,
      preTaxDeductions: "$0",
      taxCreditsDeductions: "$0",
      otherDeductionsStatus: CONSTANTS.OTHER_DEDUCTIONS_STATUS.NO,
      //variables used for results
      totalIncome: 0,
      AGI: 0,
      totalTaxWithheld: 0,
      totalTaxDue: 0,
      balance: 0,
      taxBracket: 0,
      effectiveTaxRate: 0,
      graphDataSetTaxDue: [],
      graphDataSetNetIncome: [],
      currentScreen : this.startScreenValue,      
    }
  }

  resetApp(){
    this.setState(
      this.getInitialState()
    );
  }

  changeFilingStatus(event){
    this.setState({
      filingStatus: event.target.value
    });
  }
  
  changeDeductionMode(event){
    this.setState({
      deductionMode: event.target.value
    });
  }
  
  changeDependantsClaimStatus(event){
    this.setState({
      dependantsClaimStatus: event.target.value
    });
    if(this.state.dependantsClaimStatus === CONSTANTS.DEPENDANTS_CLAIM_STATUS.NO){
      this.setState({
        numberOfDependantChildren: "0",       
        numberOfDependantRelatives: "0", 
      });
    }    
  }


  changeItemizedDeduction(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      itemizedDeductionValue: formattedValue
    });
    if(this.state.deductionMode === CONSTANTS.DEDUCTION_MODE.STANDARD){
      this.setState({
        itemizedDeductionValue: "$0",
      });
    }
  }

  changeWages(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      wages: formattedValue
    });
  }

  changeTaxWithhold(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      taxWithhold: formattedValue
    });
  }

  changeWagesSpouse(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      wagesSpouse: formattedValue
    });
  }

  changeTaxWithholdSpouse(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      taxWithholdSpouse: formattedValue
    });
  }

  changeNumberOfDependantChildren(event){    
    var value = utils.convertToValidNumber(event);
    if(value !== undefined && value !== null){
      this.setState({
        numberOfDependantChildren: value
      });
    }    
  } 

  changeNumberOfDependantRelatives(event){    
    var value = utils.convertToValidNumber(event);
    if(value !== undefined && value !== null){
      this.setState({
        numberOfDependantRelatives: value
      });
    }    
  } 

  changeOtherDeductionsStatus(event){
    this.setState({
      otherDeductionsStatus: event.target.value
    });
  }

  changePreTaxDeductions(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      preTaxDeductions: formattedValue
    });
  }

  changeTaxCreditsDeductions(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      taxCreditsDeductions: formattedValue
    });
  }

  changeCurrentScreenValue(newScreenValue){
    //calculate taxes when you are on the last screen
    if(newScreenValue === this.endScreenValue){
      this.calculateTaxes();
    }    

    //update currentScreen variable
    if(newScreenValue >= this.startScreenValue && newScreenValue <= this.endScreenValue){
      this.setState({
        currentScreen: newScreenValue,
      })
    }
    else{
      console.warn("Thwarted attempt to set newScreenValue that would exceeed maxScreenValue (in respect to screen number)");
    }    
  }

  
  render(){    
    let sectionsArray = this.generateArrayOfScreenSections();
    let sectionToDisplay = sectionsArray[this.state.currentScreen];
    let shouldRenderPrevButton = this.state.currentScreen > this.startScreenValue;
    let shoudlRenderNextButton = this.state.currentScreen < this.endScreenValue;
    

    return (
      <div id="App">
        <header className="App-header">
          TAX ESTIMATOR 2020
        </header>
        <main>
          <div id="main-container">
            {
              sectionToDisplay
            }
            <div id="controls-container">
              {
                shouldRenderPrevButton &&
                  <button onClick={() => this.changeCurrentScreenValue(this.state.currentScreen -1) } className="unselectable">PREVIOUS</button>
              }
              {
                shoudlRenderNextButton &&
                  <button onClick={() => this.changeCurrentScreenValue(this.state.currentScreen +1) } className="unselectable"> {this.state.currentScreen === this.endScreenValue-1 ? "CALCULATE" : "NEXT"} </button>
              }
              {
                this.state.currentScreen === this.endScreenValue &&
                  <button onClick={this.resetApp } className="unselectable"> RESET </button>
              }
              
            </div>        
               
          </div>
        </main>
        <footer>
            This is not a tax advice regarding filing your tax returns. This webapplication provides only estimate. 
            <br/>
            For advice regarding your taxes please conslut your CPA.
            <br/>
            Sebastian Tysler 2020©
        </footer>         
      </div>
    );
  }

  generateArrayOfScreenSections(){
    if(this.taxModel.getTaxYear() === 2019){
      return this.generateArrayOfScreenSectionsTaxYear2019();
    }
    else{
      console.error("Unknwon tax model. ")
    }
  }

  generateArrayOfScreenSectionsTaxYear2019(){
    let arrayOfSections = [];
    arrayOfSections.push(this.getFilingStatusSection());
    arrayOfSections.push(this.getDeductionModeSection());
    arrayOfSections.push(this.getDependantsSection());
    arrayOfSections.push(this.getW2Section());
    arrayOfSections.push(this.getOtherDeductionsSection());
    arrayOfSections.push(this.getTaxResultsContainer());
    return arrayOfSections;
  }

  getFilingStatusSection(){
    return(
      <DataEntrySection sectionName="FILING STATUS" sectionContent={
        <SectionContentFilingStatus
          filingStatus = {this.state.filingStatus}
          changeFilingStatus = {this.changeFilingStatus}
        />
        } 
      />
    );
  }

  getDeductionModeSection(){
    return(
      <DataEntrySection sectionName="DEDUCTION TYPE" sectionContent={
        <SectionContentDeductionMode
          deductionMode = {this.state.deductionMode}
          changeDeductionMode = {this.changeDeductionMode}
          changeItemizedDeduction = {this.changeItemizedDeduction}
          itemizedDeductionValue = {this.state.itemizedDeductionValue}
        />
        } 
      />
    );
  }

  getDependantsSection(){
    return(
      <DataEntrySection sectionName="DEPENDANTS" sectionContent={
        <SectionContentDependants 
          dependantsClaimStatus = {this.state.dependantsClaimStatus}
          changeDependantsClaimStatus = {this.changeDependantsClaimStatus}
          changeNumberOfDependantChildren = {this.changeNumberOfDependantChildren}
          numberOfDependantChildren = {this.state.numberOfDependantChildren}
          changeNumberOfDependantRelatives = {this.changeNumberOfDependantRelatives}
          numberOfDependantRelatives = {this.state.numberOfDependantRelatives}
        />
        } 
      /> 
    );
  }

  getW2Section(){
    return(
      <DataEntrySection sectionName="W2 INFO" sectionContent={
        <SectionContentW2 
          changeWages = {this.changeWages}
          wages = {this.state.wages}
          changeTaxWithhold = {this.changeTaxWithhold}
          taxWithhold = {this.state.taxWithhold}
          filingStatus = {this.state.filingStatus}
          changeWagesSpouse = {this.changeWagesSpouse}
          wagesSpouse = {this.state.wagesSpouse}
          changeTaxWithholdSpouse = {this.changeTaxWithholdSpouse}
          taxWithholdSpouse = {this.state.taxWithholdSpouse}
        />
        } 
      /> 
    );
  }

  getOtherDeductionsSection(){
    return(
      <DataEntrySection sectionName="OTHER DEDUCTIONS" sectionContent={
        <SectionContentOtherDeductions
          otherDeductionsStatus = {this.state.otherDeductionsStatus}
          changeOtherDeductionsStatus = {this.changeOtherDeductionsStatus}
          preTaxDeductions = {this.state.preTaxDeductions}
          changePreTaxDeductions = {this.changePreTaxDeductions}
          taxCreditsDeductions = {this.state.taxCreditsDeductions}
          changeTaxCreditsDeductions = {this.changeTaxCreditsDeductions}
        />
        } 
      />
    );
  }

  getTaxResultsContainer(){
    return(
      <TaxResultsContainer 
        balance = {this.state.balance}
        totalIncome = {this.state.totalIncome}
        AGI = {this.state.AGI}
        totalTaxWithheld = {this.state.totalTaxWithheld}
        totalTaxDue = {this.state.totalTaxDue}
        taxBracket = {this.state.taxBracket}
        effectiveTaxRate = {this.state.effectiveTaxRate}
        graphDataSetTaxDue = {this.state.graphDataSetTaxDue}
        graphDataSetNetIncome = {this.state.graphDataSetNetIncome}  
        messageForNonRefundableTaxCredits = {this.state.messageForNonRefundableTaxCredits}          
      />
    );
  }

  calculateTaxes(){    
    let newTaxModel = new taxModel2019();
    newTaxModel.initFromState(this.state);
    //update taxModel and recalculate - if there was a change in basic variables
    if(!this.taxModel.hasTheSameInitialState(newTaxModel)){      
      newTaxModel.recalculate();
      logger.log("calculateTaxes() method called. newTaxModel has totalincome: " + newTaxModel.getTotalIncome() + ", tax due: " + newTaxModel.getTotalTaxDue());
      //update graph data
      let dataForGraphs = graphDataSetGenerator(newTaxModel);
      this.setState({
          balance : newTaxModel.balance,
          totalIncome: newTaxModel.totalIncome,
          AGI: newTaxModel.taxableIncome,
          totalTaxWithheld: newTaxModel.totalTaxesWithheld,
          totalTaxDue: newTaxModel.totalTaxDue,
          taxBracket: newTaxModel.taxBracketRate,
          effectiveTaxRate: newTaxModel.effectiveTaxRate,
          graphDataSetTaxDue: dataForGraphs.datasetTaxDue,
          graphDataSetNetIncome: dataForGraphs.datasetNetIncome,
          messageForNonRefundableTaxCredits: newTaxModel.getMessageForNonRefundableTaxCredits(),
        }    
      );
      this.taxModel = newTaxModel;
    }
  }

}


export default App;
