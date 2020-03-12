import React from 'react';
import PropTypes from 'prop-types';

function ItemizedDeductionInput(props){
    return (
        <div>
            Your total amount for itemized deduction:
        </div>
    );

}

ItemizedDeductionInput.propTypes = {
    itemizedDeductionValue: PropTypes.number.isRequired
  };

export default ItemizedDeductionInput;