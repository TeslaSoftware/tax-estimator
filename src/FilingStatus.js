import React from 'react';
import PropTypes from 'prop-types';

class FilingStatus extends React.Component {

    render() {
        //label for attribute must match input id attribute -> https://www.w3.org/TR/WCAG-TECHS/H44.html
      return <div>
          Select your filing status:
        <div>
            <input 
                type="radio" 
                id="filing-status-single"
                name="filing-status" 
                checked={this.props.filingStatus === 'single'}
                onChange={this.props.changeFilingStatus}
                value="single"  
            />
            <label htmlFor="filing-status-single">Single</label>

            <input 
                type="radio" 
                id="filing-status-MFJ"
                name="filing-status" 
                checked={this.props.filingStatus === 'MFJ'}
                onChange={this.props.changeFilingStatus}
                value="MFJ" 
            />
            <label htmlFor="filing-status-MFJ">Married filing jointly</label>

            <input 
                type="radio" 
                id="filing-status-MFS"
                name="filing-status" 
                checked={this.props.filingStatus === 'MFS'}
                onChange={this.props.changeFilingStatus}
                value="MFS" 
            />
            <label htmlFor="filing-status-MFS">Married filing separately</label>

            <input 
                type="radio" 
                id="filing-status-HOH"
                name="filing-status" 
                checked={this.props.filingStatus === 'HOH'}
                onChange={this.props.changeFilingStatus}
                value="HOH" 
            />
            <label htmlFor="filing-status-HOH">Head of household</label>

            <input 
                type="radio" 
                id="filing-status-QW"
                name="filing-status" 
                checked={this.props.filingStatus === 'QW'}
                onChange={this.props.changeFilingStatus}
                value="QW" 
            />
            <label htmlFor="filing-status-QW">Qualifying widow(er)</label>
        </div>
                   
      </div>;
    }
  }
  
FilingStatus.propTypes = {
    filingStatus: PropTypes.string.isRequired,
    changeFilingStatus: PropTypes.func.isRequired
  };

  export default FilingStatus;