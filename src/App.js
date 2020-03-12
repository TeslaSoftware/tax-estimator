import React from 'react';
import './App.css';
import FilingStatus from './FilingStatus';
import DependandsNumberInput from './DependandsNumberInput';
import DeductionMode from './DeductionMode';
import ItemizedDeductionInput from './ItemizedDeductionInput';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';


var deductionModeRadioData = {
  groupName: "deduction-mode",
  description: "Select your deduction mode:",
  items: [
    {
      value: "standard",
      description: "Standard Deduction"
    },
    {
      value: "itemized",
      description: "Itemized Deduction"
    },
  ]
};

var filingStatusRadioData = {
  groupName: "deduction-mode",
  description: "Select your deduction mode:",
  items: [
    {
      value: "single",
      description: "Single"
    },
    {
      value: "MFJ",
      description: "Married filing jointly"
    },
    {
      value: "MFS",
      description: "Married filing separately"
    },
    {
      value: "HOH",
      description: "Head of household"
    },
    {
      value: "QW",
      description: "Qualifying widow(er)"
    },
  ]
};

class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      filingStatus:"single",
      deductionMode: "standard",
      //Need to use input value as String instead of number. This is because of React bug 9402->https://github.com/facebook/react/issues/9402
      numberOfDependants: "0",       
      itemizedDeductionValue: "$0",
    }
    this.changeFilingStatus = this.changeFilingStatus.bind(this);
    this.changeDeductionMode = this.changeDeductionMode.bind(this);
    this.changeItemizedDeduction = this.changeItemizedDeduction.bind(this);
    this.changeNumberOfDependants = this.changeNumberOfDependants.bind(this);
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

  changeItemizedDeduction(event){
    var formattedValue = convertToCurrency(event, true)
    this.setState({
        itemizedDeductionValue: formattedValue
    });
  }

  changeNumberOfDependants(event){    
    var value = convertToValidNumber(event);
    if(value !== undefined && value !== null){
      this.setState({
        numberOfDependants: value
      });
    }
    
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
              //Create fields for W-2 and account for option married filing jointly to display both sides - you and spouse
              //Create a display summary
              //Create logic to calculate balance

            }
            <RadioGroup className="deduction-mode-container" radioGroupData={filingStatusRadioData} currentValue={this.state.filingStatus} handleChange={this.changeFilingStatus} />
            <RadioGroup className="deduction-mode-container" radioGroupData={deductionModeRadioData} currentValue={this.state.deductionMode} handleChange={this.changeDeductionMode} />
            
            <InputNumber className="itemized-deduction-container" name="input-itemized-deduction" description="Itemized deduction value" inputId="input-itemized-deduction" onChange={this.changeItemizedDeduction} value={this.state.itemizedDeductionValue} isCurrency={true}/>  
            <InputNumber className="dependants-number-container" name="input-dependants-number" description="Number of dependants" inputId="input-dependants-number" onChange={this.changeNumberOfDependants} value={this.state.numberOfDependants}  maxValue={99}/>  
            
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
