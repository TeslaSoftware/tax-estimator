import * as utils from './utils';
import CONSTANTS from './constants';
import taxBrackets from './taxBrackets2019';

var keysForNumericProperties = ['numberOfDependantChildren', 'numberOfDependantRelatives', 
    'itemizedDeductionValue', 'wages', 'taxWithhold', 'wagesSpouse', 'taxWithholdSpouse', 'preTaxDeductions', 'taxCreditsDeductions'];
var keysForStringProperties = ['filingStatus', 'deductionMode', 'dependantsClaimStatus', 'otherDeductionsStatus'];
//keys for valid state properties, that are not used by model
var keysForExcludedProperties = ['totalIncome', 'AGI', 'totalTaxWithheld', 'totalTaxDue', 'balance']
var keysForResultProperties = [ 'totalIncome', 'totalTaxableIncome' ,'totalTaxesWithheld', 'totalTaxDue', 
'balance', 'taxBracketRate', 'effectiveTaxRate'];

//Define standard deductions values for tax year 2019
var standardDeductions = {};
standardDeductions[CONSTANTS.FILING_STATUS_VALUE.SINGLE] = 12200;
standardDeductions[CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY] = 24400;
standardDeductions[CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_SEPERATELY] = 12200;
standardDeductions[CONSTANTS.FILING_STATUS_VALUE.HEAD_OF_HOUSEHOLD] = 18350;
standardDeductions[CONSTANTS.FILING_STATUS_VALUE.QUALIFIED_WIDOW] = 24400;

//Define deduction value for type of dependant
var dependantsTaxCredit = {};
dependantsTaxCredit.child = 2000;
dependantsTaxCredit.childRefundable = 1400;
dependantsTaxCredit.relative = 500; 


class taxModel2019{        
    
    constructor(state){
        this.stateOfModel = state;
        this.parseState();
        //create object properties for results
        keysForResultProperties.forEach( prop  => this[prop] = 0);
    }

    updateState(newState){
        this.stateOfModel = newState;
        this.parseState();        
    }

    
    /*
    Parses state to create members variables /object properties with the same keys. 
    Depends on the globally defined set of string and numeric keys. Logs warning if property key is found that does not belong to any of these two sets.
    */
    parseState(){
        for (let [key, value] of Object.entries(this.stateOfModel)) {
            if(keysForNumericProperties.includes(key)){
                this[key] = utils.convertStringToNumber(value)
            }
            else if(keysForStringProperties.includes(key)){
                this[key] = value;    
            }
            else if( !keysForExcludedProperties.includes(key)){
                console.warn("Unexpected property found during parsing the state. Property key is " + key);
            }                 
        }
    }

    printoutModel(){
        console.log(this.stateOfModel);
    }

    getState(){
        return this.stateOfModel;
    }


    eqals(otherState){
        //assuming no particular order is preserved between properties of original object and compared
        for (let [key, value] of Object.entries(otherState)) {
            if(this.stateOfModel[key] !== value){
                console.log(`TaxModel2019.equals(): Objects are different. Mismatch found in key: '${key}'. Model state value: '${this.stateOfModel[key]}', otherState value: '${value}' `);
                return false;
            }             
        }
        console.log("TaxModel2019.equals(): Objects are the same");
        return true;
    }

    recalculate(){
        //total wages are considered from both spouses only if they are filing jointly
        if(this.filingStatus === CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY){
            this.totalIncome = this.wages + this.wagesSpouse;
            this.totalTaxesWithheld = this.taxWithhold + this.taxWithholdSpouse;
        }
        else{
            this.totalIncome = this.wages;
            this.totalTaxesWithheld = this.taxWithhold;
        }
        console.log("Total Income: " + this.totalIncome);
        
        //calculate pre-tax deductions:standard or itemized deduction, and other deductions
        var deductionsValue = 0;
        if(this.deductionMode === CONSTANTS.DEDUCTION_MODE.STANDARD){
            deductionsValue += standardDeductions[this.filingStatus];
        }
        else if(this.deductionMode === CONSTANTS.DEDUCTION_MODE.ITEMIZED){
            deductionsValue += this.itemizedDeductionValue;
        }
        else{
            console.error("Unsupported deduction mode selcted: " + this.deductionMode);
        }

        console.log("Based on deduction mode, current deduction value is " + deductionsValue);
        //calculate taxable income (if less than zero then change to zero)
        this.taxableIncome = this.totalIncome - deductionsValue;
        if(this.taxableIncome < 0){
            this.taxableIncome = 0;
        }
        console.log("Taxable income value is " + this.taxableIncome);

        //calculate taxes due & tax bracket
        this.calcualteTaxesDue();

        //calculate tax credit for dependants + other tax credits
        var taxCreditsValue = this.calculateTaxCredits();
        
        //update taxes due, by subtracting tax credits
        this.totalTaxDue -= taxCreditsValue;
        console.log("Tax due after deducting tax credits: " +this.totalTaxDue  );
        //calculate balance

        this.balance = this.calculateBalance();
        
        console.log("Balance is: " + this.balance);
        /*calculate effective tax rate = Taxes Due (aka total tax) / Taxable Income (income before adjustments)
        An individual's effective tax rate represents the average of all tax brackets that their income passes through 
        as well as the total of all deductions and credits that lower their total income to their taxable income.
        */
       this.effectiveTaxRate = 0;
       if(this.totalIncome !== 0){
        this.effectiveTaxRate = this.totalTaxDue / this.totalIncome;
       } 
       console.log("Effective Tax Rate is : " + this.effectiveTaxRate );
    }

    calcualteTaxesDue(){
        var currentAGI = this.taxableIncome;
        var taxesDue = 0;
        var taxBracketRate = 0;
        //specific tax bracket to filing status
        var taxBracket = taxBrackets[this.filingStatus]; 
        var keys = Object.keys(taxBracket);
        keys.sort();
        taxBracketRate = taxBracket[keys[0]].rate;
        //go from lowest tax bracket
        for(let i=0; i < keys.length && currentAGI > 0; i++){
            var key = keys[i];
            var bracketDiff = taxBracket[key].to - taxBracket[key].from;
            taxBracketRate =  taxBracket[key].rate;
            //use bracket difference to calculate taxes in this bracket, or use remainder of currentAGI, whichever is smaller
            var amountToUseForCalculation = Math.min(bracketDiff,currentAGI);
            taxesDue += amountToUseForCalculation * taxBracket[key].rate;
            currentAGI -= amountToUseForCalculation;
        }
        this.totalTaxDue = taxesDue;
        this.taxBracketRate = taxBracketRate;
        console.log("Taxes due before applying credits: " + this.totalTaxDue);
        console.log("Tax bracket rate: " + this.taxBracketRate);
    }

    calculateTaxCredits(){
        
        //calulate tax credits based on dependants
        var result = 0;
        result += this.getTaxCreditsForDependantRelatives();
        result += this.getTaxCreditsForDependantChildren();
        result += this.taxCreditsDeductions;
        console.log("Total tax credits are: " + result);
        return result;
    }

    getTaxCreditsForDependantChildren(){
        return dependantsTaxCredit.child * this.numberOfDependantChildren;
    }
    getRefundableTaxCreditsForDependantChildren(){
        return dependantsTaxCredit.childRefundable * this.numberOfDependantChildren;
    }

    getTaxCreditsForDependantRelatives(){
        return dependantsTaxCredit.relative * this.numberOfDependantRelatives;
    }

    //negative balance means you own taxes, positive balance means you get refund
    calculateBalance(){
        var result = this.totalTaxesWithheld - this.totalTaxDue;
        /*
        business logic: only tax credits for child is refundable up to $1400 
        (so if person makes $0 this year they can only get refund up to $1400 for each child).        
        */
       
        //substract non-refundable credit = up to zero
        if(result > 0 && this.getTaxCreditsForDependantRelatives() > 0){
            result -= this.getTaxCreditsForDependantRelatives();
            //if after this reduction it gets negative we set it to zero
            if(result < 0){
                result = 0;
            }
        }
        //substract non-refundable credit = up to zero. For each child only $1400 is refundable
        if(result > 0 && this.getTaxCreditsForDependantChildren() > 0){
            //maximize tax credit, by using all refundable tax credits
            var nonrefundable = this.getTaxCreditsForDependantChildren() - this.getRefundableTaxCreditsForDependantChildren();
            result -= nonrefundable;
            if(result < 0){
                result = 0;
            }
        }
        return result;
    }


}
export default taxModel2019;