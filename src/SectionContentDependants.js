import React from 'react';
import CONSTANTS from './constants';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';

var radioData_DependantsClaimStatus = {
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

export default function(props){
    return(
        <div>
          <RadioGroup 
            id="dependants-claim-status-main-container"  
            radioGroupData={radioData_DependantsClaimStatus} 
            currentValue={props.dependantsClaimStatus} 
            handleChange={props.changeDependantsClaimStatus} 
          />
            {//Render only if dependants claim status is yes, else if selected no then rest variables for children and relatives
              props.dependantsClaimStatus === CONSTANTS.DEPENDANTS_CLAIM_STATUS.YES ?
              <div className="dependants-number-main-container">
                <InputNumber 
                  id="dependants-number-children-container" 
                  name="input-dependants-number-children" 
                  description="Number of qualifying children: " 
                  inputId="input-dependants-number-children" 
                  onChange={props.changeNumberOfDependantChildren} 
                  value={props.numberOfDependantChildren}  
                  maxValue={10}
                />  
                <InputNumber 
                  id="dependants-number-relatives-container" 
                  name="input-dependants-number-relatives" 
                  description="Number of qualifying relatives: " 
                  inputId="input-dependants-number-relatives" 
                  onChange={props.changeNumberOfDependantRelatives} 
                  value={props.numberOfDependantRelatives}  
                  maxValue={10}
                />  
              </div>
              :null
            }
        </div>
      );
}