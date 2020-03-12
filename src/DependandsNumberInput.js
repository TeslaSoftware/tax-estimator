import React from 'react';
import PropTypes from 'prop-types';

function DependantsNumberInput(props){
    return (
        <div>
        Number of claimed dependants
        </div>
    );

}

DependantsNumberInput.propTypes = {
    dependantsNumber: PropTypes.number.isRequired
  };

export default DependantsNumberInput;