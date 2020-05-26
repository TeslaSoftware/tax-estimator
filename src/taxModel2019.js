import * as utils from './utils';
import CONSTANTS from './constants';
import taxBrackets from './taxBrackets2019';
import * as logger from './logger';

var keysForNumericProperties = ['numberOfDependantChildren', 'numberOfDependantRelatives', 
    'itemizedDeductionValue', 'wages', 'taxWithhold', 'wagesSpouse', 'taxWithholdSpouse', 'preTaxDeductions', 'taxCreditsDeductions'];
var keysForStringProperties = ['filingStatus', 'deductionMode', 'dependantsClaimStatus', 'otherDeductionsStatus'];

var keysForInitialProperties = ['numberOfDependantChildren', 'numberOfDependantRelatives', 
'itemizedDeductionValue', 'wages', 'taxWithhold', 'wagesSpouse', 'taxWithholdSpouse', 'preTaxDeductions', 
'taxCreditsDeductions', 'filingStatus', 'deductionMode', 'dependantsClaimStatus', 'otherDeductionsStatus'];

//keys for valid state properties, that are not used by model
var keysForExcludedProperties = ['totalIncome', 'AGI', 'totalTaxWithheld', 'totalTaxDue', 'balance', 'graphDataSet', 
'graphDataSetTaxDue', 'graphDataSetNetIncome', 'currentScreen', 'messageForNonRefundableTaxCredits', 'effectiveTaxRate',  'taxBracket'];



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
    
    constructor(){

        //fixed variables indentifying model
        this.taxYear = 2019;
        this.startScreenValue = 0;
        this.endScreenValue = 5;

        //basic variables used for calculations
        this.wages = 0;
        this.wagesSpouse = 0;
        this.taxWithhold = 0;
        this.taxWithholdSpouse = 0;

        this.totalIncome = 0;
        this.taxableIncome = 0;
        this.totalTaxesWithheld = 0;
        this.totalTaxDue = 0;
        this.balance = 0;
        this.taxBracketRate = 0;
        this.effectiveTaxRate = 0;

        this.deductionMode = CONSTANTS.DEDUCTION_MODE.STANDARD;
        this.filingStatus = CONSTANTS.FILING_STATUS_VALUE.SINGLE;

        this.numberOfDependantChildren = 0;
        this.numberOfDependantRelatives = 0;
        this.itemizedDeductionValue = 0;
        this.taxCreditsDeductions = 0;
        this.preTaxDeductions = 0;
        
    }

    //Setters
    setWages(newWages){
        this.wages = utils.convertStringToNumber(newWages);
    }

    setWagesSpouse(newWagesSpouse){
        this.wagesSpouse =  utils.convertStringToNumber(newWagesSpouse);
    }

    setTaxWithhold(newTaxWithhold){
        this.taxWithhold = utils.convertStringToNumber(newTaxWithhold);
    }
    
    setTaxWithholdSpouse(newTaxWithholdSpouse){
        this.taxWithholdSpouse = utils.convertStringToNumber(newTaxWithholdSpouse);
    }

    setFilingStatus(newFilingStatus){ 
        this.filingStatus = newFilingStatus;
    }

    setDeductionMode(newDeductionMode){ 
        this.deductionMode = newDeductionMode;
    }
    
    setNumberOfDependantChildren(newNumberOfDependantChildren){ 
        this.numberOfDependantChildren = newNumberOfDependantChildren;
    }

    setNumberOfDependantRelatives(newNumberOfDependantRelatives){ 
        this.numberOfDependantRelatives = newNumberOfDependantRelatives;
    }

    setItemizedDeductionValue(newItemizedDeductionValue){ 
        this.itemizedDeductionValue = newItemizedDeductionValue;
    }

    setTaxCredits(newTaxCredits){
        this.taxCreditsDeductions = utils.convertStringToNumber(newTaxCredits);
    }

    setPreTaxDeductions(newPreTaxDeductions){
        this.preTaxDeductions = utils.convertStringToNumber(newPreTaxDeductions);
    }


    //getters
    getTaxCreditsForDependantChildren(){
        return dependantsTaxCredit.child * this.numberOfDependantChildren;
    }
    getRefundableTaxCreditsForDependantChildren(){
        return dependantsTaxCredit.childRefundable * this.numberOfDependantChildren;
    }

    getTaxCreditsForDependantRelatives(){
        return dependantsTaxCredit.relative * this.numberOfDependantRelatives;
    }

    getTotalIncome(){ return this.totalIncome; }

    getTotalTaxDue(){ return this.totalTaxDue; }

    getWages(){ return this.wages; }

    getWagesSpouse(){ return this.wagesSpouse; }

    getTaxBracketRate(){ return this.taxBracketRate; }

    //this will be in the future interface method
    getTaxYear(){
        return this.taxYear;
    }


    /*
    Parses state to create members variables /object properties with the same keys. 
    Depends on the globally defined set of string and numeric keys. Logs warning if property key is found that does not belong to any of these two sets.
    */
   initFromState(newState){
        //Validate properties of newState        
        for (let [key, value] of Object.entries(newState)) {
            if( !keysForNumericProperties.includes(key) && !keysForStringProperties.includes(key) && !keysForExcludedProperties.includes(key)){
                console.warn("Unexpected property found during parsing the state. Property key is " + key + " and has value " + value);
            }                 
        }

        //set variables from state
        this.wages = utils.convertStringToNumber(newState.wages);
        this.wagesSpouse = utils.convertStringToNumber(newState.wagesSpouse);
        this.taxWithhold = utils.convertStringToNumber(newState.taxWithhold);
        this.taxWithholdSpouse = utils.convertStringToNumber(newState.taxWithholdSpouse);

        this.filingStatus = newState.filingStatus;
        this.deductionMode = newState.deductionMode;

        //parse variables for credits and deductions
        this.numberOfDependantChildren = utils.convertStringToNumber(newState.numberOfDependantChildren);
        this.numberOfDependantRelatives = utils.convertStringToNumber(newState.numberOfDependantRelatives);
        this.itemizedDeductionValue = utils.convertStringToNumber(newState.itemizedDeductionValue);
        this.taxCreditsDeductions = utils.convertStringToNumber(newState.taxCreditsDeductions);
        this.preTaxDeductions = utils.convertStringToNumber(newState.preTaxDeductions);
    }

    printoutModel(){
        logger.log(this.stateOfModel);
    }

    getState(){
        return this.stateOfModel;
    }

    hasTheSameInitialState(otherModel){
        if(!(otherModel instanceof taxModel2019)){
            console.warn("TaxModel2019.hasTheSameInitialState(): Object supplied in argument is not an instance of taxModel2019");
            return false;
        }

        //assuming no particular order is preserved between properties of original object and compared
        for (let key of keysForInitialProperties) {
            if(this[key] !== otherModel[key]){
                logger.log(`TaxModel2019.hasTheSameInitialState(): Objects are different. Mismatch found in key: '${key}'. Old Model value: '${this[key]}', new Model value: '${otherModel[key]}' `);
                return false;
            }             
        }
        logger.log("TaxModel2019.hasTheSameInitialState(): Objects are the same");
        return true;
    }

    clone(){
        let model = new taxModel2019();
        for (let key of keysForInitialProperties) {
            model[key] = this[key];
        }
        return model;
    }


    recalculate(){      
        logger.logGroupCollapsed("taxModel2019.recalculate() group:");
        //total wages are considered from both spouses only if they are filing jointly
        if(this.filingStatus === CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY){
            this.totalIncome = this.wages + this.wagesSpouse;
            this.totalTaxesWithheld = this.taxWithhold + this.taxWithholdSpouse;
        }
        else{
            this.totalIncome = this.wages;
            this.totalTaxesWithheld = this.taxWithhold;
        }
        logger.log("Total Income: " + this.totalIncome);


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

        deductionsValue += this.preTaxDeductions;

        logger.log("Total amount for deductions is currently: " + deductionsValue);
        //add other pre-tax deductions as specified by user
        

        //calculate taxable income (if less than zero then change to zero)
        this.taxableIncome = this.totalIncome - deductionsValue;
        if(this.taxableIncome < 0){
            this.taxableIncome = 0;
        }
        logger.log("Taxable income value is " + this.taxableIncome);

        //calculate taxes due & tax bracket
        this.calcualteTaxesDue();

        //calculate tax credit for dependants + other tax credits
        var taxCreditsValue = this.calculateTaxCredits();
        
        //update taxes due, by subtracting tax credits
        this.totalTaxDue -= taxCreditsValue;
        logger.log("Tax due after deducting tax credits: " +this.totalTaxDue  );
        //calculate balance

        this.balance = this.calculateBalance();
        
        logger.log("Balance is: " + this.balance);
        /*calculate effective tax rate = Taxes Due (aka total tax) / Taxable Income (income before adjustments)
        An individual's effective tax rate represents the average of all tax brackets that their income passes through 
        as well as the total of all deductions and credits that lower their total income to their taxable income.
        */
       this.effectiveTaxRate = 0;
       if(this.totalIncome !== 0){
        this.effectiveTaxRate = this.totalTaxDue / this.taxableIncome;
       } 
       logger.log("Effective Tax Rate is : " + this.effectiveTaxRate );
       logger.logGroupEnd();
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
        this.totalTaxDue = Math.floor(taxesDue);
        this.taxBracketRate = taxBracketRate;
        logger.log("Taxes due before applying credits: " + this.totalTaxDue);
        logger.log("Tax bracket rate: " + this.taxBracketRate);
    }

    calculateTaxCredits(){        
        //calulate tax credits based on dependants
        var result = 0;
        result += this.getTaxCreditsForDependantRelatives();
        result += this.getTaxCreditsForDependantChildren();
        result += this.taxCreditsDeductions;
        logger.log("Total tax credits are: " + result);
        return result;
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

    getMessageForNonRefundableTaxCredits(){
        return "In tax year 2019 only tax credits for dependant children are refundable up to $1400 per each child. Therefore your expected refund (negative value of total tax due) and actual refund (balance) are different."
    }
}
export default taxModel2019;