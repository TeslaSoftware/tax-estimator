import React from 'react';
import * as utils from './utils';
import GraphRenderer from './GraphRenderer';

export default function(props){
    var resultMessage = ""
    if(props.balance > 0){
      resultMessage =  `CONGRATULATIONS! Your estimated refund is: ${utils.convertToCurrency(props.balance)}`;
    }
    else if(props.balance < 0){
      resultMessage = `Looks like you will owe ${utils.convertToCurrency(props.balance)} in taxes.`;
    }
    else{
      resultMessage = "Looks like you will be all square! Nothing to pay, but no refund either...";
    }

    return(
      <div id="results-container">
        <div id="results-container-header">RESULTS</div>
        <div id="results-container-content">
          <div className="results-row results-message">
          {resultMessage}
          </div>
          <div className="results-row">
            <div className="results-row-label">Your total wages:</div>
            <div className="results-row-value">{utils.convertToCurrency(props.totalIncome, true)}</div>
          </div>
            <div className="results-row">
              <div className="results-row-label">Your adjusted gross income:</div>
              <div className="results-row-value">{utils.convertToCurrency(props.AGI, true)}</div>
            </div>
            <div className="results-row">
              <div className="results-row-label">Your total taxes withheld:</div>
              <div className="results-row-value">{utils.convertToCurrency(props.totalTaxWithheld, true)}</div>
            </div>
            <div className="results-row">
              <div className="results-row-label">Your total taxes due: </div>
              <div className="results-row-value">{utils.convertToCurrency(props.totalTaxDue, true)}</div>
            </div>
            <div className="results-row">
              <div className="results-row-label">Your balance is: </div>
              <div className="results-row-value">{utils.convertToCurrency(props.balance, true)}</div>
            </div>
          </div>
          <div className="graph-container">
            <GraphRenderer 
              graphDataSetTaxDue={props.graphDataSetTaxDue} 
              graphDataSetNetIncome={props.graphDataSetNetIncome }  
              balance={props.balance}
              totalIncome={props.totalIncome}
              totalTaxDue={props.totalTaxDue}
          />
        </div>
      </div>
    );


}