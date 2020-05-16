import React from 'react';
import './App.scss';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';
import DataEntrySection from './DataEntrySection';
import CONSTANTS from './constants';
import * as utils from './utils';
import taxModel2019 from './taxModel2019';
import {VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryLegend, VictoryAxis, VictoryGroup, VictoryScatter} from 'victory'


var colors = {
  primaryColor: "#0d47a1",
  primaryLightColor: "#5472d3",
  primaryDarkColor: "#002171",
  onPrimaryColor: "#FFFFFF",
  onPrimaryLightColor: "#000000",
  onPrimaryDarkColor: "#f1f8e9",

  secondaryColor: "#689f38",
  secondaryLightColor: "#99d066",
  secondaryDarkColor: "#387002",
  onSecondaryColor: "#FFFFFF",
  onSecondaryLightColor: "#000000",
  onSecondaryDarkColor: "#FFFFFF",

  errorColor: "#B00020",
  onErrorColor: "#FFFFFF",
}

var deductionModeRadioData = {
  groupName: "deduction-mode",
  description: "Which deduction mode you want to use?",
  items: [
    {
      value: CONSTANTS.DEDUCTION_MODE.STANDARD,
      description: "Standard Deduction"
    },
    {
      value: CONSTANTS.DEDUCTION_MODE.ITEMIZED,
      description: "Itemized Deduction"
    },
  ]
};


var filingStatusRadioData = {
  groupName: "filing-status",
  description: "What is your filing status?",
  items: [
    {
      value: CONSTANTS.FILING_STATUS_VALUE.SINGLE,
      description: "Single"
    },
    {
      value: CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY,
      description: "Married filing jointly"
    },
    {
      value: CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_SEPERATELY,
      description: "Married filing separately"
    },
    {
      value: CONSTANTS.FILING_STATUS_VALUE.HEAD_OF_HOUSEHOLD,
      description: "Head of household"
    },
    {
      value: CONSTANTS.FILING_STATUS_VALUE.QUALIFIED_WIDOW,
      description: "Qualifying widow(er)"
    },
  ]
};

var dependantsClaimStatusRadioData = {
  groupName: "dependants-claim-status",
  description: "Do you have depenedants to claim?",
  items: [
    {
      value: CONSTANTS.DEPENDANTS_CLAIM_STATUS.YES,
      description: "Yes"
    },
    {
      value: CONSTANTS.DEPENDANTS_CLAIM_STATUS.NO,
      description: "No"
    }
  ]
}

var otherDeductionsStatusRadioData = {
  groupName: "other-deductions-status",
  description: "Do you have any other deductions/tax credits?",
  items: [
    {
      value: CONSTANTS.OTHER_DEDUCTIONS_STATUS.YES,
      description: "Yes"
    },
    {
      value: CONSTANTS.OTHER_DEDUCTIONS_STATUS.NO,
      description: "No"
    }
  ]
}

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
    this.renderGraph = this.renderGraph.bind(this);
    this.generateDataSetForGraph = this.generateDataSetForGraph.bind(this);
    
    this.taxModel = new taxModel2019(this.state);
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
  }


  changeItemizedDeduction(event){
    var formattedValue = utils.convertToCurrency(event.target.value, true)
    this.setState({
      itemizedDeductionValue: formattedValue
    });
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
    var resultMessage = ""
    if(this.state.balance > 0){
      resultMessage =  `CONGRATULATIONS! Your estimated refund is: ${utils.convertToCurrency(this.state.balance)}`;
    }
    else if(this.state.balance < 0){
      resultMessage = `Looks like you will owe ${utils.convertToCurrency(this.state.balance)} in taxes.`;
    }
    else{
      resultMessage = "Looks like you will be all square! Nothing to pay, but no refund either...";
    } 

    var graph = this.renderGraph();

    return (
      <div className="App">
        <header className="App-header">
          TAX ESTIMATOR 2020
        </header>
        <main>
          <div id="main-container">
            {              
              //TO-DO     
              //Create a display summary
              //Add graph
              //Change UI to display step by step one section at a time. Also show progress in squares with numbers- highlight current section number
              //use state variable to keep track on which screen you are and render only that section.You can add all section to an array and display only current index section.
              //develop unit tests
            }


          
            <DataEntrySection sectionName="FILING STATUS" sectionContent={this.generateFilingStatusSectionContent()} />
            <DataEntrySection sectionName="DEDUCTION TYPE" sectionContent={this.generateDeductionModeSectionContent()} />
            <DataEntrySection sectionName="DEPENDANTS" sectionContent={this.generateDedepndantsSectionContent()} />            
            <DataEntrySection sectionName="W2 INFO" sectionContent={this.generateW2SEctionContent()} />            
            <DataEntrySection sectionName="OTHER DEDUCTIONS" sectionContent={this.generateOtherDeductionsSectionContent()} />
            <div id="controls-container">
              <button onClick={this.calculateTaxes}>CALCULATE</button>
            </div>
            
            
            <div id="results-container">
              <div id="results-container-header">RESULTS</div>
              <div id="results-container-content">
                <div className="results-row results-message">
                  {resultMessage}
                </div>
                <div className="results-row">
                  <div className="results-row-label">Your total wages:</div>
                  <div className="results-row-value">{utils.convertToCurrency(this.state.totalIncome, true)}</div>                 
                </div>
                <div className="results-row">
                  <div className="results-row-label">Your adjusted gross income:</div>
                  <div className="results-row-value">{utils.convertToCurrency(this.state.AGI, true)}</div>                 
                </div>
                <div className="results-row">
                  <div className="results-row-label">Your total taxes withheld:</div>
                  <div className="results-row-value">{utils.convertToCurrency(this.state.totalTaxWithheld, true)}</div>                 
                </div>
                <div className="results-row">
                  <div className="results-row-label">Your total taxes due: </div>
                  <div className="results-row-value">{utils.convertToCurrency(this.state.totalTaxDue, true)}</div>                 
                </div>
                <div className="results-row">
                  <div className="results-row-label">Your balance is: </div>
                  <div className="results-row-value">{utils.convertToCurrency(this.state.balance, true)}</div>                 
                </div>
              </div>
              <div className="graph-container">
                {graph}
              </div>
              
            </div>  

            
          </div>

        </main>
        <footer>

        </footer>
         
      </div>
    );
  }

  calculateTaxes(){
    console.log("calculating taxes");
    //update taxModel and recalculate
    if(!this.taxModel.hasTheSameState(this.state)){      
      this.taxModel.updateState(this.state);
      this.taxModel.recalculate();
      this.setState({
        balance : this.taxModel.balance,
        totalIncome: this.taxModel.totalIncome,
        AGI: this.taxModel.totalTaxableIncome,
        totalTaxWithheld: this.taxModel.totalTaxesWithheld,
        totalTaxDue: this.taxModel.totalTaxDue,
      });
    }
    
    
    //update graph data
    this.generateDataSetForGraph();
  }


  generateFilingStatusSectionContent(){
    return(
      <RadioGroup id="filing-status-main-container" radioGroupData={filingStatusRadioData} currentValue={this.state.filingStatus} handleChange={this.changeFilingStatus} />
    );
  }

  generateDeductionModeSectionContent(){
    return(
      <div>
        <RadioGroup id="deduction-mode-main-container" radioGroupData={deductionModeRadioData} currentValue={this.state.deductionMode} handleChange={this.changeDeductionMode} />
          { //Render only if itemized deduction is selected
            this.state.deductionMode === CONSTANTS.DEDUCTION_MODE.ITEMIZED &&
            <InputNumber id="itemized-deduction-container" name="input-itemized-deduction" description="Itemized deduction value: " inputId="input-itemized-deduction" onChange={this.changeItemizedDeduction} value={this.state.itemizedDeductionValue} isCurrency={true}/>  
          }
      </div>
    );
  }
  
  generateDedepndantsSectionContent(){
    return(
      <div>
        <RadioGroup id="dependants-claim-status-main-container"  radioGroupData={dependantsClaimStatusRadioData} currentValue={this.state.dependantsClaimStatus} handleChange={this.changeDependantsClaimStatus} />
          {//Render only if dependants claim status is yes
            this.state.dependantsClaimStatus === CONSTANTS.DEPENDANTS_CLAIM_STATUS.YES &&
            <div className="dependants-number-main-container">
              <InputNumber id="dependants-number-children-container" name="input-dependants-number-children" description="Number of qualifying children: " inputId="input-dependants-number-children" onChange={this.changeNumberOfDependantChildren} value={this.state.numberOfDependantChildren}  maxValue={10}/>  
              <InputNumber id="dependants-number-relatives-container" name="input-dependants-number-relatives" description="Number of qualifying relatives: " inputId="input-dependants-number-relatives" onChange={this.changeNumberOfDependantRelatives} value={this.state.numberOfDependantRelatives}  maxValue={10}/>  
            </div>
          }
      </div>
    );
  }

  generateW2SEctionContent(){
    return(
      <div id="w2-info-container">
        <div id="w2-your-info" className="w2-info"> YOUR W-2
          <InputNumber id="wages-container" name="input-wages" description="Wages, tips and compensation: " inputId="input-wages" onChange={this.changeWages} value={this.state.wages} isCurrency={true}/>  
          <InputNumber id="tax-withhold-container" name="input-tax-withhold" description="Federal tax withhold: " inputId="input-tax-withhold" onChange={this.changeTaxWithhold} value={this.state.taxWithhold} isCurrency={true}/>  
        </div>
          {
            //Render only if married filing jointlty
            this.state.filingStatus === CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY &&
            <div id="w2-spouse-info" className="w2-info"> SPOUSE W-2
              <InputNumber id="wages-spouse-container" name="input-wages-spouse" description="Wages, tips and compensation: " inputId="input-wages-spouse" onChange={this.changeWagesSpouse} value={this.state.wagesSpouse} isCurrency={true}/>  
              <InputNumber id="tax-withhold-spouse-container" name="input-tax-withhold-spouse" description="Federal tax withhold: " inputId="input-tax-withhold-spouse" onChange={this.changeTaxWithholdSpouse} value={this.state.taxWithholdSpouse} isCurrency={true}/>  
            </div>                
          }              
      </div>
    );
  }

  generateOtherDeductionsSectionContent(){
    return(
      <div>
        <RadioGroup id="other-deductions-status-main-container" radioGroupData={otherDeductionsStatusRadioData} currentValue={this.state.otherDeductionsStatus} handleChange={this.changeOtherDeductionsStatus} />
          {//Render only if other deduction are selected
          this.state.otherDeductionsStatus === CONSTANTS.OTHER_DEDUCTIONS_STATUS.YES &&
          <div id="other-deductions-main-container">
            <div className="container-label">Enter other deductions/tax credits:</div>
            <InputNumber id="pre-tax-deductions-container" name="input-pre-tax-deductions" description="Other pre-tax deductions: " inputId="input-pre-tax-deductions" onChange={this.changePreTaxDeductions} value={this.state.preTaxDeductions} isCurrency={true}/>  
            <InputNumber id="tax-credits-deductions-container" name="input-tax-credits-deductions" description="Tax credits: " inputId="input-tax-credits-deductions" onChange={this.changeTaxCreditsDeductions} value={this.state.taxCreditsDeductions} isCurrency={true}/>  
          </div>
        }  
      </div>
    );
  }
  
  renderGraph(){
     
    var graphDataSetTaxDue = this.state.graphDataSetTaxDue;
    var graphDataSetNetIncome = this.state.graphDataSetNetIncome;

   return (
      <VictoryChart
        domainPadding={{x: [10, 0], y: 10}}
        //minDomain={{x:0, y: 0 }}
        containerComponent={
          <VictoryVoronoiContainer           
            labels={({ datum }) => `Gross Income: $${datum.x}, ${datum.description} $${datum.y}`}
          />
        }
      >
        <VictoryLegend x={125} y={10}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: colors.primaryDarkColor } }}
          colorScale={[ colors.primaryLightColor, colors.secondaryColor]}
          data={[
            { name: "Tax Due" }, { name: "Net Income" }
          ]}
        />
        <VictoryAxis crossAxis
          label='Gross Income'
          style={{
            axis: {stroke: colors.primaryDarkColor},
            axisLabel: {fontSize: 16, padding: 30, fill: colors.primaryDarkColor}, 
            grid: {stroke: ({ tick }) => tick > 25 ? "red" : "grey", opacity: 0.5, },
            tickLabels: {fontSize: 12, padding: 8, fill: colors.primaryDarkColor},
          }}
        />

        <VictoryAxis dependentAxis crossAxis
          //label='Amount [$]'
          style={{
            axis: {stroke: colors.primaryDarkColor},
            axisLabel: {fontSize: 16, padding: 30, fill: colors.primaryDarkColor},            
            grid: {stroke: "grey"},
            tickLabels: {fontSize: 12, padding: 8, fill: colors.primaryDarkColor},
          }}
        />
        
        {this.state.balance < 0 &&
        //render only if balance is larger then zero - to avoid poorly looking graph
        <VictoryScatter
          symbol="star"
          size={7}
          style={{ data: { fill: colors.primaryLightColor} }}
          data = {[{ x: this.state.totalIncome, y: this.state.totalTaxDue  }]}        
        />
        }

        {this.state.balance < 0 &&
        //render only if balance is larger then zero - to avoid poorly looking graph
        <VictoryScatter
          symbol="star"
          size={7}
          style={{ data: { fill: colors.secondaryLightColor} }}
          data = {[{ x: this.state.totalIncome, y: this.state.totalIncome - this.state.totalTaxDue }]}        
        />
        }

        <VictoryGroup>
          <VictoryLine
            name = "series-1"
            interpolation="catmullRom"
            data={graphDataSetTaxDue}
            style={{
              data: { stroke: colors.primaryLightColor }
            }}
            //draw the line - animation
            animate={{
              duration: 500,
              onLoad: { duration: 1000 }
            }}
          />
        </VictoryGroup>

        <VictoryLine
          name = "series-2"
          interpolation="catmullRom"
          data={graphDataSetNetIncome}
          style={{
            data: { stroke: colors.secondaryLightColor }
          }}
          //draw the line - animation
          animate={{
            duration: 500,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
   )
      
  }

  generateDataSetForGraph(){
    //$10,000 as increment/decreament
    const INCREMENT = 10000; 
    //Graph points to the left (and right) from the user set value for gross income 
    const NUM_OF_GRAPH_POINTS_TO_LEFT = 5;
    const NUM_OF_GRAPH_POINTS_TO_RIGHT = 5;
    console.log("Generating dataset for graph...");
    let datasetTaxDue = [];
    let datasetNetIncome = [];
    //clone the model
    let model = new taxModel2019(this.state);
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
    console.log("Start point income is: " + startPointIncome);

    /*
    Go from start point income to endpoint income (from point most to the left to point most ot the right)
    Place results in an array of objects, where each object has x and y values.
    X is gross income, Y is taxes due.
    */
    let endPointIncome = startPointIncome + ((NUM_OF_GRAPH_POINTS_TO_LEFT + NUM_OF_GRAPH_POINTS_TO_RIGHT) * INCREMENT);
    for(let currentIncome = startPointIncome; currentIncome <= endPointIncome ; currentIncome += INCREMENT){
        //for sake of calculation assume that entire income comes from primary wages and spouse did not have income
        if(currentIncome > 0){
          model.setWagesSpouse(0);
          model.setWages(currentIncome);
          model.recalculate();
          let taxesDue = Math.floor(model.getTotalTaxDue());
          console.log("taxes due are: " + taxesDue + ", current income is: " + currentIncome);
          if(taxesDue > 0){
            //only add to points to display if tax due has positive value
            datasetTaxDue.push({x: currentIncome, y: taxesDue, description: "Tax Due"});
            datasetNetIncome.push({x: currentIncome, y: currentIncome-taxesDue, description: "Net Income"});
          }
          //add values for user entered data if they are within inverval of this and next iteration
          if(currentIncome < this.state.totalIncome && currentIncome + INCREMENT > this.state.totalIncome){
            datasetTaxDue.push({x: this.state.totalIncome, y: this.state.totalTaxDue, description: "Tax Due"});
            datasetNetIncome.push({x: this.state.totalIncome, y:  this.state.totalIncome - this.state.totalTaxDue, description: "Net Income"});
          }
        }
    }    

    this.setState({
      graphDataSetTaxDue: datasetTaxDue,
      graphDataSetNetIncome: datasetNetIncome
    });
  }


}


export default App;
