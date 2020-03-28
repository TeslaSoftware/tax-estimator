import React from 'react';

function RadioGroup(props){

    var radiosAndLabels = props.radioGroupData.items.map((item, index) => {
        var elementID = props.radioGroupData.groupName +"-" + item.value;
        return (
            <div key={index} className={props.radioGroupData.groupName + "-container radio-group-item"}>            
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

    return (
    <div id={props.id} className={props.className}>
        <div className={props.radioGroupData.groupName + "-group-label radio-group-label"}>{props.radioGroupData.description}</div>
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