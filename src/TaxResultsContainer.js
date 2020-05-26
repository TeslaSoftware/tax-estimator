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
    //Render only if absolute value of balance is different than absolute value of tax due
    var shouldRenderMessageForNonRefundableTaxCredits =  (Math.abs(props.balance) < Math.abs(props.totalTaxDue)) ;
    var shouldRenderGraph = false;
    try {
      //we need at least two data points to render graph
      shouldRenderGraph = props.graphDataSetTaxDue.length > 1 && props.graphDataSetNetIncome.length > 1;
    } catch (error) {
      console.error("Unable to evaluate content of graphDataSetTaxDue & graphDataSetNetIncome");
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
          {
            props.taxBracket > 0 ?
              <div className="results-row">
                <div className="results-row-label">Your tax bracket is: </div>
                <div className="results-row-value">{(props.taxBracket * 100).toFixed(0)} % </div>
              </div>
            : null
          }
          {
            props.effectiveTaxRate > 0 ?
              <div className="results-row">
                <div className="results-row-label">Your effective tax rate is: </div>
                <div className="results-row-value">{(props.effectiveTaxRate * 100).toFixed(0)} % </div>
              </div>
            : null
          }
          <div className="results-row">
            <div className="results-row-label">Your balance is: </div>
            {
              shouldRenderMessageForNonRefundableTaxCredits ?
                <div className="results-row-value">{utils.convertToCurrency(props.balance, true)}*</div>
              :
                <div className="results-row-value">{utils.convertToCurrency(props.balance, true)}</div>
            }
          </div>

            { shouldRenderMessageForNonRefundableTaxCredits ?
              <div className="results-row">
                <div className="messageForNonRefundableTaxCredits">
                  *{props.messageForNonRefundableTaxCredits}
                </div>
              </div>
              :null
            }            
        </div>
        {
          shouldRenderGraph ?
            <div className="graph-container">
              <div id="graph-label">
                  Graph showing projections of your net income and taxes due based on changes in gross income.
              </div>
              <GraphRenderer 
                graphDataSetTaxDue={props.graphDataSetTaxDue} 
                graphDataSetNetIncome={props.graphDataSetNetIncome }  
                balance={props.balance}
                totalIncome={props.totalIncome}
                totalTaxDue={props.totalTaxDue}
              />
            </div>
          :null
        }    
      </div>
      
    );
}