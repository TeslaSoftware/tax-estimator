import React from 'react';
import CONSTANTS from './constants';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';

var radioData_DeductionMode = {
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
  

export default function(props){
    return(
        <div>
            <RadioGroup 
            id="deduction-mode-main-container" 
            radioGroupData={radioData_DeductionMode} 
            currentValue={props.deductionMode} 
            handleChange={props.changeDeductionMode} 
            />
            { //Render only if itemized deduction is selected
              props.deductionMode === CONSTANTS.DEDUCTION_MODE.ITEMIZED &&
              <InputNumber 
                id="itemized-deduction-container" 
                name="input-itemized-deduction" 
                description="Itemized deduction value: " 
                inputId="input-itemized-deduction" 
                onChange={props.changeItemizedDeduction} 
                value={props.itemizedDeductionValue} 
                isCurrency={true}
                />  
            }
        </div>
      );
}