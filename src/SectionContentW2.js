import React from 'react';
import CONSTANTS from './constants';
import InputNumber from './InputNumber';


export default function(props){
    return(
        <div id="w2-info-container">
          <div id="w2-your-info" className="w2-info"> 
            <div className="w2-info-header">YOUR W-2</div>
            <InputNumber 
                id="wages-container" 
                name="input-wages" 
                description="Wages, tips and compensation: " 
                inputId="input-wages" 
                onChange={props.changeWages} 
                value={props.wages} 
                isCurrency={true}
            />  
            <InputNumber 
                id="tax-withhold-container" 
                name="input-tax-withhold" 
                description="Federal tax withhold: " 
                inputId="input-tax-withhold" 
                onChange={props.changeTaxWithhold} 
                value={props.taxWithhold} 
                isCurrency={true}
            />  
          </div>
            {
              //Render only if married filing jointlty
              props.filingStatus === CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY &&
              <div id="w2-spouse-info" className="w2-info"> 
                <div className="w2-info-header">SPOUSE W-2</div>
                <InputNumber 
                    id="wages-spouse-container" 
                    name="input-wages-spouse" 
                    description="Wages, tips and compensation: " 
                    inputId="input-wages-spouse" 
                    onChange={props.changeWagesSpouse} 
                    value={props.wagesSpouse} 
                    isCurrency={true}
                />  
                <InputNumber 
                    id="tax-withhold-spouse-container" 
                    name="input-tax-withhold-spouse" 
                    description="Federal tax withhold: " 
                    inputId="input-tax-withhold-spouse" 
                    onChange={props.changeTaxWithholdSpouse} 
                    value={props.taxWithholdSpouse} 
                    isCurrency={true}
                />  
              </div>                
            }              
        </div>
      );
}