import React from 'react';
import PropTypes from 'prop-types';

function DeductionMode(props){
        return <div>
                Select your deduction mode:
                    <div>
                    <input 
                        type="radio" 
                        id="deduction-mode-standard"
                        name="deduction-mode" 
                        checked={props.deductionMode === 'standard'}
                        onChange={props.changeDeductionMode}
                        value="standard"  
                    />
                    <label htmlFor="deduction-mode-standard">Standard Deduction</label>

                    <input 
                        type="radio" 
                        id="deduction-mode-itemized"
                        name="deduction-mode" 
                        checked={props.deductionMode === 'itemized'}
                        onChange={props.changeDeductionMode}
                        value="itemized" 
                    />
                    <label htmlFor="deduction-mode-itemized">Itemized deduction</label>

                </div>
            </div>
    

}

DeductionMode.propTypes = {
    deductionMode: PropTypes.string.isRequired
  };

export default DeductionMode;