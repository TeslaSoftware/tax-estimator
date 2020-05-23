import React from 'react';
import CONSTANTS from './constants';
import RadioGroup from './RadioGroup';

var radioData_FilingStatus = {
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
  

export default function(props){
    return(
        <RadioGroup 
            id="filing-status-main-container" 
            radioGroupData={radioData_FilingStatus} 
            currentValue={props.filingStatus} 
            handleChange={props.changeFilingStatus} 
        />
      );
}