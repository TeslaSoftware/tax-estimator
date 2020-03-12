import React from 'react';
import PropTypes from 'prop-types';

//This component will render either as number input or currency input
class InputNumber extends React.Component{

    

    render(){
        var inputElementToRender;
        var descriptionToLabel = this.props.description ? (this.props.description +": ") : this.props.name+": ";
        if(this.props.isCurrency){
            //input styled as currency
            inputElementToRender = 
            <input 
                type="text" 
                inputMode="numeric"
                id={this.props.inputId}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                
                maxLength={this.props.maxLength}
                size={this.props.size}
            >
            </input>
        }
        else{
            //input styled as whole number - positive integer
            inputElementToRender =
            <input 
                type="number" 
                inputMode="numeric"
                id={this.props.inputId}
                name={this.props.name} 
                value={this.props.value}
                onChange={this.props.onChange}

                min={0}
                max={this.props.maxValue}
                maxLength={this.props.maxLength}
                size={this.props.size}
            >
            </input>
        }

        return (
            <div>
                <label htmlFor={this.props.name}>{descriptionToLabel}</label>
                {inputElementToRender}  
            </div>
        );
    }
}

InputNumber.defaultProps = {
    isCurrency: false,
    maxLength: 10,
    maxValue: 10,
    size: 10,
}

InputNumber.propTypes = {
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    inputId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.number,
    maxLength: PropTypes.number,
    step: PropTypes.number,
    isCurrency: PropTypes.bool,
  };




export default InputNumber;