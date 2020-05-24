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
    this.state ={
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
      graphDataSetTaxDue: [],
      graphDataSetNetIncome: [],
      
    }
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
    this.calculateTaxes = this.calculateTaxes.bind(this);
    this.generateDataSetForGraph = this.generateDataSetForGraph.bind(this);
    
    //non-state variables and objects
    this.taxModel = new taxModel2019();
    this.taxModel.initFromState(this.state);
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

  
  render(){    
    //here you can add logic   

    return (
      <div className="App">
        <header className="App-header">
          TAX ESTIMATOR 2020
        </header>
        <main>
          <div id="main-container">
            {              
              //TO-DO
              //Change UI to display step by step one section at a time. Also show progress in squares with numbers- highlight current section number
              //use state variable to keep track on which screen you are and render only that section.You can add all section to an array and display only current index section.
              //develop unit tests
            }
          
            <DataEntrySection sectionName="FILING STATUS" sectionContent={
              <SectionContentFilingStatus
                filingStatus = {this.state.filingStatus}
                changeFilingStatus = {this.changeFilingStatus}
              />
              } 
            />
            <DataEntrySection sectionName="DEDUCTION TYPE" sectionContent={
              //this.generateDeductionModeSectionContent()
              <SectionContentDeductionMode
                deductionMode = {this.state.deductionMode}
                changeDeductionMode = {this.changeDeductionMode}
                changeItemizedDeduction = {this.changeItemizedDeduction}
                itemizedDeductionValue = {this.state.itemizedDeductionValue}
              />} 
            />
            <DataEntrySection sectionName="DEPENDANTS" sectionContent={
              //this.generateDedepndantsSectionContent()
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
            <div id="controls-container">
              <button onClick={this.calculateTaxes}>CALCULATE</button>
            </div>         
            <TaxResultsContainer 
              balance = {this.state.balance}
              totalIncome = {this.state.totalIncome}
              AGI = {this.state.AGI}
              totalTaxWithheld = {this.state.totalTaxWithheld}
              totalTaxDue = {this.state.totalTaxDue}
              graphDataSetTaxDue = {this.state.graphDataSetTaxDue}
              graphDataSetNetIncome = {this.state.graphDataSetNetIncome}  
              messageForNonRefundableTaxCredits = {this.state.messageForNonRefundableTaxCredits}          
            />   
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


  calculateTaxes(){
    logger.log("calculating taxes");
    let newTaxModel = new taxModel2019();
    newTaxModel.initFromState(this.state);
    //update taxModel and recalculate - if there was a change in basic variables
    if(!this.taxModel.hasTheSameInitialState(newTaxModel)){      
      newTaxModel.recalculate();
      //update graph data
      let dataForGraphs = graphDataSetGenerator(newTaxModel);
      this.setState({
          balance : newTaxModel.balance,
          totalIncome: newTaxModel.totalIncome,
          AGI: newTaxModel.taxableIncome,
          totalTaxWithheld: newTaxModel.totalTaxesWithheld,
          totalTaxDue: newTaxModel.totalTaxDue,
          graphDataSetTaxDue: dataForGraphs.datasetTaxDue,
          graphDataSetNetIncome: dataForGraphs.datasetNetIncome,
          messageForNonRefundableTaxCredits: newTaxModel.getMessageForNonRefundableTaxCredits(),
        }    
      );
      this.taxModel = newTaxModel;
    }
  }

  //Generates data sets for Graph 
  generateDataSetForGraph(currentTaxModel){
    //$10,000 as increment/decreament
    const INCREMENT = 10000; 
    //Graph points to the left (and right) from the user set value for gross income 
    const NUM_OF_GRAPH_POINTS_TO_LEFT = 5;
    const NUM_OF_GRAPH_POINTS_TO_RIGHT = 5;
    logger.log("Generating dataset for graph...");
    let datasetTaxDue = [];
    let datasetNetIncome = [];
    //clone the model
    let model = currentTaxModel.clone();
    //need to recalculate first so all the variables are set (and you can get reliable value for total)
    model.recalculate();
    let income = model.getTotalIncome();
   
    /*
    Get start point income for graph point (point with value all the way to the left)
    Start point income should be more than zero (i.e. cannot be negtive).
    */
    let startPointIncome =  income;
    for(let iter = NUM_OF_GRAPH_POINTS_TO_LEFT; iter >0 ; iter--){
      let candidateForStartPointIncome = startPointIncome - INCREMENT;
      if(candidateForStartPointIncome > 0){
        startPointIncome = candidateForStartPointIncome
      }
      else{
        //we already at zero or less - may as well break out of the loop
        break;
      }
    }
    startPointIncome = Math.floor(startPointIncome / INCREMENT) * INCREMENT;
    logger.log("Start point income is: " + startPointIncome);

    /*
    Go from start point income to endpoint income (from point most to the left to point most ot the right)
    Place results in an array of objects, where each object has x and y values.
    X is gross income, Y is taxes due.
    */
    let addedCurrentIncome = false;
    let endPointIncome = startPointIncome + ((NUM_OF_GRAPH_POINTS_TO_LEFT + NUM_OF_GRAPH_POINTS_TO_RIGHT) * INCREMENT);
    for(let currentIncome = startPointIncome; currentIncome <= endPointIncome ; currentIncome += INCREMENT){
        //for sake of calculation assume that entire income comes from primary wages and spouse did not have income
        if(currentIncome > 0){
          model.setWagesSpouse(0);
          model.setWages(currentIncome);
          model.recalculate();
          let taxesDue = Math.floor(model.getTotalTaxDue());
          logger.log("Adding datapoint. Values: taxes due: " + taxesDue + ", current income: " + currentIncome);
          if(taxesDue > 0){
            //only add to points to display if tax due has positive value
            datasetTaxDue.push({x: currentIncome, y: taxesDue, description: "Tax Due"});
            datasetNetIncome.push({x: currentIncome, y: currentIncome-taxesDue, description: "Net Income"});
          }
          /*
          add values for user entered data if they are within inverval of this and next iteration
          Need to use values from this.taxModel, because state may have not updated and it may contain old value
          */
          if(!addedCurrentIncome && currentIncome < currentTaxModel.totalIncome && currentIncome + INCREMENT > this.taxModel.totalIncome){
            logger.log("Adding datapoint. Values: taxes due: " + currentTaxModel.totalTaxDue + ", total income: " + currentTaxModel.totalIncome);
            addedCurrentIncome = true;
            datasetTaxDue.push({x:  currentTaxModel.totalIncome, y: Math.floor(currentTaxModel.totalTaxDue), description: "Tax Due"});
            datasetNetIncome.push({x:  currentTaxModel.totalIncome, y:  Math.floor(currentTaxModel.totalIncome - currentTaxModel.totalTaxDue), description: "Net Income"});
          }
        }
    }    
    if(datasetTaxDue.length === 1 || datasetNetIncome.length === 1){
      //if there is only one data point then its insufficient to produce the graph. Clear the datasets, so we display blank graph instead of haphazar one.
      datasetTaxDue = [];
      datasetNetIncome = [];
    }

    this.setState({
        graphDataSetTaxDue: datasetTaxDue,
        graphDataSetNetIncome: datasetNetIncome
      }   
    );
  }
}


export default App;
