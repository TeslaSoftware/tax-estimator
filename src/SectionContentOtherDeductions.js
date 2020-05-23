import React from 'react';
import CONSTANTS from './constants';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';

var RadioData_OtherDeductionsStatus = {
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

export default function(props){
    return(
        <div>
            <RadioGroup 
                id="other-deductions-status-main-container" 
                radioGroupData={RadioData_OtherDeductionsStatus} 
                currentValue={props.otherDeductionsStatus} 
                handleChange={props.changeOtherDeductionsStatus} 
            />
            {//Render only if other deduction are selected
            props.otherDeductionsStatus === CONSTANTS.OTHER_DEDUCTIONS_STATUS.YES &&
            <div id="other-deductions-main-container">
                <div className="container-label">Enter other deductions/tax credits:</div>
                <InputNumber 
                    id="pre-tax-deductions-container" 
                    name="input-pre-tax-deductions" 
                    description="Other pre-tax deductions: " 
                    inputId="input-pre-tax-deductions" 
                    onChange={props.changePreTaxDeductions} 
                    value={props.preTaxDeductions} 
                    isCurrency={true}
                />  
                <InputNumber 
                    id="tax-credits-deductions-container" 
                    name="input-tax-credits-deductions" 
                    description="Tax credits: " 
                    inputId="input-tax-credits-deductions" 
                    onChange={props.changeTaxCreditsDeductions} 
                    value={props.taxCreditsDeductions} 
                    isCurrency={true}
                />  
            </div>
          }  
        </div>
      );
}