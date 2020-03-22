import React from 'react';
import './App.css';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';
import CONSTANTS from './constants';


var deductionModeRadioData = {
  groupName: "deduction-mode",
  description: "Select your deduction mode:",
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
  description: "Select filing status:",
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
  description: "Do you have depenedants to claim:",
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
  description: "Do you have any other deductions:",
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
      filingStatus:"single",
      deductionMode: "standard",
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
      postTaxDeductions: "$0",
      otherDeductionsStatus: CONSTANTS.OTHER_DEDUCTIONS_STATUS.NO,

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
    this.changePostTaxDeductions = this.changePostTaxDeductions.bind(this);
    this.changeOtherDeductionsStatus = this.changeOtherDeductionsStatus.bind(this);

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
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      itemizedDeductionValue: formattedValue
    });
  }

  changeWages(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      wages: formattedValue
    });
  }

  changeTaxWithhold(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      taxWithhold: formattedValue
    });
  }

  changeWagesSpouse(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      wagesSpouse: formattedValue
    });
  }

  changeTaxWithholdSpouse(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      taxWithholdSpouse: formattedValue
    });
  }

  changeNumberOfDependantChildren(event){    
    var value = convertToValidNumber(event);
    if(value !== undefined && value !== null){
      this.setState({
        numberOfDependantChildren: value
      });
    }    
  } 

  changeNumberOfDependantRelatives(event){    
    var value = convertToValidNumber(event);
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
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      preTaxDeductions: formattedValue
    });
  }

  changePostTaxDeductions(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
      postTaxDeductions: formattedValue
    });
  }

  render(){    
    
    return (
      <div className="App">
        <header className="App-header">
          TAX ESTIMATOR
        </header>
        <main>
          <div className="main-container">
            {              
              //TO-DO            
              //Add SASS to the project
              //Make a mock-up of UI in Figma software
              //Create a display summary
              //Create logic to calculate balance

            }
            <RadioGroup className="filing-status-main-container" radioGroupData={filingStatusRadioData} currentValue={this.state.filingStatus} handleChange={this.changeFilingStatus} />
            <RadioGroup className="deduction-mode-main-container" radioGroupData={deductionModeRadioData} currentValue={this.state.deductionMode} handleChange={this.changeDeductionMode} />
            { //Render only if itemized deduction is selected
              this.state.deductionMode === CONSTANTS.DEDUCTION_MODE.ITEMIZED &&
              <InputNumber className="itemized-deduction-container" name="input-itemized-deduction" description="Itemized deduction value: " inputId="input-itemized-deduction" onChange={this.changeItemizedDeduction} value={this.state.itemizedDeductionValue} isCurrency={true}/>  
            }   
            <RadioGroup className="dependants-claim-status-main-container" radioGroupData={dependantsClaimStatusRadioData} currentValue={this.state.dependantsClaimStatus} handleChange={this.changeDependantsClaimStatus} />
            {//Render only if dependants claim status is yes
              this.state.dependantsClaimStatus === CONSTANTS.DEPENDANTS_CLAIM_STATUS.YES &&
              <div className="dependants-number-main-container">
                <InputNumber className="dependants-number-children-container" name="input-dependants-number-children" description="Number of qualifying children: " inputId="input-dependants-number-children" onChange={this.changeNumberOfDependantChildren} value={this.state.numberOfDependantChildren}  maxValue={10}/>  
                <InputNumber className="dependants-number-relatives-container" name="input-dependants-number-relatives" description="Number of qualifying relatives: " inputId="input-dependants-number-relatives" onChange={this.changeNumberOfDependantRelatives} value={this.state.numberOfDependantRelatives}  maxValue={10}/>  
              </div>
            }

            
            <div className="w2-container">W2 INFO
              <div className="w2-your-info"> YOUR W-2
                <InputNumber className="wages-container" name="input-wages" description="Wages, tips and compensation: " inputId="input-wages" onChange={this.changeWages} value={this.state.wages} isCurrency={true}/>  
                <InputNumber className="tax-withhold-container" name="input-tax-withhold" description="Federal tax withhold: " inputId="input-tax-withhold" onChange={this.changeTaxWithhold} value={this.state.taxWithhold} isCurrency={true}/>  
              </div>
              {
                //Render only if married filing jointlty
                this.state.filingStatus === CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY &&
                  <div className="w2-spouse-info"> SPOUSE W-2
                    <InputNumber className="wages-spuse-container" name="input-wages-spouse" description="Wages, tips and compensation: " inputId="input-wages-spouse" onChange={this.changeWagesSpouse} value={this.state.wagesSpouse} isCurrency={true}/>  
                    <InputNumber className="tax-withhold-spouse-container" name="input-tax-withhold-spouse" description="Federal tax withhold: " inputId="input-tax-withhold-spouse" onChange={this.changeTaxWithholdSpouse} value={this.state.taxWithholdSpouse} isCurrency={true}/>  
                  </div>                
              }              
            </div>
            <RadioGroup className="other-deductions-status-main-container" radioGroupData={otherDeductionsStatusRadioData} currentValue={this.state.otherDeductionsStatus} handleChange={this.changeOtherDeductionsStatus} />
            {//Render only if other deduction are selected
              this.state.otherDeductionsStatus === CONSTANTS.OTHER_DEDUCTIONS_STATUS.YES &&
              <div className="other-deductions-main-container">
                OTHER DEDUCTIONS:
                <InputNumber className="pre-tax-deductions-container" name="input-pre-tax-deductions" description="Other pre-tax deductions: " inputId="input-pre-tax-deductions" onChange={this.changePreTaxDeductions} value={this.state.preTaxDeductions} isCurrency={true}/>  
                <InputNumber className="post-tax-deductions-container" name="input-post-tax-deductions" description="Other post-tax deductions: " inputId="input-post-tax-deductions" onChange={this.changePostTaxDeductions} value={this.state.postTaxDeductions} isCurrency={true}/>  
              </div>
            }  
            <div className="summary-container">
              SUMMARY PLACEHOLDER

            </div>  

            
          </div>

        </main>
        <footer>

        </footer>
         
      </div>
    );
  }
}

/*
helper functions
*/

function convertToCurrency(event, allowNegativeValues){
  var value = event.target.value.toString();
  if(value === "" || value === "$") return "$0";
  var isNegativeValue = false;  

  //check if value is negative
  if(allowNegativeValues && value.charAt(0) === "-"){
    isNegativeValue = true;
  }
  
  // remove all characters that aren't digit
  value = value.replace(/[^0-9]/g,'');  
  // replace multiple zeros with a single one
  value = value.replace(/^0+(.*)$/,'0$1');
  // remove leading zero
  value = value.replace(/^0([^.].*)$/,'$1');
  //on tax returns we use only full dolalr values and omit cents.
  value = formatNumber(value);

  //add curency symbol
  value = "$" + value;
  value = isNegativeValue ? "-"+value : value;

  console.log("converted value is: " + value);
  return value;
}

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function removeLeadingZeros(number){
  // remove all characters that aren't digit
  number = number.replace(/[^0-9]/g,'');  
  // replace multiple zeros with a single one
  number = number.replace(/^0+(.*)$/,'0$1');
  return number;
}

function convertToValidNumber(event){
  //check if event's target value is number
  var returnValue = event.target.value;
  if(returnValue === "") return 0;
  if(isNaN(returnValue)) {
    console.warn("NaN - not a number passed to convertToValidNumber function...");
    return;
  }
  if(parseInt(returnValue) > parseInt(event.target.max) || parseInt(returnValue) < parseInt(event.target.min)){
    console.debug("user attempted to enter value beyond allowed range. Min=" + event.target.min + ", max=" + event.target.max + ", user enter value=" + returnValue);
    return;
  }
  return parseInt(returnValue).toString();
}

export default App;
