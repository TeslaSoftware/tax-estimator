import React from 'react';
import PropTypes from 'prop-types';

function RadioGroup(props){



    var radiosAndLabels = props.radioGroupData.items.map((item, index) => {
        var elementID = props.radioGroupData.groupName +"-" + item.value;
        return (
            <div className={props.radioGroupData.groupName +"-" + item.value + "-container"}>            
                <input 
                    type="radio" 
                    id={elementID}
                    name={props.radioGroupData.name} 
                    checked={item.value === props.currentValue}
                    onChange={props.handleChange}
                    value={item.value}
                />
                <label htmlFor={elementID}>{item.description}</label>
            </div>
        );
    });
    console.log(radiosAndLabels);

    return (
    <div className={props.className}>
        {props.radioGroupData.description}
        {radiosAndLabels} 
    </div>)

}

RadioGroup.defaultProps ={
  groupName: "sample-group-name",
  description: "Sample radio button description: ",
  items: [
    {
      value: "second-item",
      description: "First Item"
    },
    {
      value: "second-item",
      description: "Second Item"
    },
  ]
}

export default RadioGroup;