
/*
helper functions
*/

export function convertToCurrency(event, allowNegativeValues){
    var value = event.target.value.toString();
    if(value === "" || value === "$") return "$0";
    var isNegativeValue = false;  
  
    //check if value is negative
    if(allowNegativeValues && value.charAt(0) === "-"){
      isNegativeValue = true;
    }
    
    // remove all characters that aren't digit
    value = value.replace(/[^0-9]/g,'');  
    // replace multiple zeros with a single one
    value = value.replace(/^0+(.*)$/,'0$1');
    // remove leading zero
    value = value.replace(/^0([^.].*)$/,'$1');
    //on tax returns we use only full dolalr values and omit cents.
    value = formatNumber(value);
  
    //add curency symbol
    value = "$" + value;
    value = isNegativeValue ? "-"+value : value;
  
    console.log("converted value is: " + value);
    return value;
  }
  
export  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
export function removeLeadingZeros(number){
    // remove all characters that aren't digit
    number = number.replace(/[^0-9]/g,'');  
    // replace multiple zeros with a single one
    number = number.replace(/^0+(.*)$/,'0$1');
    return number;
  }
  
export function convertToValidNumber(event){
    //check if event's target value is number
    var returnValue = event.target.value;
    if(returnValue === "") return 0;
    if(isNaN(returnValue)) {
      console.warn("NaN - not a number passed to convertToValidNumber function...");
      return;
    }
    if(parseInt(returnValue) > parseInt(event.target.max) || parseInt(returnValue) < parseInt(event.target.min)){
      console.debug("user attempted to enter value beyond allowed range. Min=" + event.target.min + ", max=" + event.target.max + ", user enter value=" + returnValue);
      return;
    }
    return parseInt(returnValue).toString();
  }

  export function convertStringToNumber(value){
    if(value === "") return 0;
    // remove all characters that aren't digit
    value = value.replace(/[^0-9]/g,'');  
    return parseFloat(value);
  }
