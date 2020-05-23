
import * as logger from './logger';

let graphDataSetGenerator = function(currentTaxModel){
    let objectToReturn = {
        datasetTaxDue : [],
        datasetNetIncome : []
    }

    //sanity check
    if(!(currentTaxModel)){
        console.error("graphDataSetGenerator: missing argument in function call. ");
        console.trace();
        return {};
    }

    //$10,000 as increment/decreament
    const INCREMENT = 10000; 
    //Graph points to the left (and right) from the user set value for gross income 
    const NUM_OF_GRAPH_POINTS_TO_LEFT = 5;
    const NUM_OF_GRAPH_POINTS_TO_RIGHT = 5;
    logger.log("Generating dataset for graph...");
    let datasetTaxDue = [];
    let datasetNetIncome = [];
    //clone the model
    let model = currentTaxModel.clone();
    //need to recalculate first so all the variables are set (and you can get reliable value for total)
    model.recalculate();
    let income = model.getTotalIncome();
    
    /*
    Get start point income for graph point (point with value all the way to the left)
    Start point income should be more than zero (i.e. cannot be negtive).
    */
    let startPointIncome =  income;
    for(let iter = NUM_OF_GRAPH_POINTS_TO_LEFT; iter >0 ; iter--){
        let candidateForStartPointIncome = startPointIncome - INCREMENT;
        if(candidateForStartPointIncome > 0){
        startPointIncome = candidateForStartPointIncome
        }
        else{
        //we already at zero or less - may as well break out of the loop
        break;
        }
    }
    startPointIncome = Math.floor(startPointIncome / INCREMENT) * INCREMENT;
    logger.log("Start point income is: " + startPointIncome);

    /*
    Go from start point income to endpoint income (from point most to the left to point most ot the right)
    Place results in an array of objects, where each object has x and y values.
    X is gross income, Y is taxes due.
    */
    let addedCurrentIncome = false;
    let endPointIncome = startPointIncome + ((NUM_OF_GRAPH_POINTS_TO_LEFT + NUM_OF_GRAPH_POINTS_TO_RIGHT) * INCREMENT);
    for(let currentIncome = startPointIncome; currentIncome <= endPointIncome ; currentIncome += INCREMENT){
        //for sake of calculation assume that entire income comes from primary wages and spouse did not have income
        if(currentIncome > 0){
            model.setWagesSpouse(0);
            model.setWages(currentIncome);
            model.recalculate();
            let taxesDue = Math.floor(model.getTotalTaxDue());
            logger.log("Adding datapoint. Values: taxes due: " + taxesDue + ", current income: " + currentIncome);
            if(taxesDue > 0){
            //only add to points to display if tax due has positive value
            datasetTaxDue.push({x: currentIncome, y: taxesDue, description: "Tax Due"});
            datasetNetIncome.push({x: currentIncome, y: currentIncome-taxesDue, description: "Net Income"});
            }
            /*
            add values for user entered data if they are within inverval of this and next iteration
            Need to use values from this.taxModel, because state may have not updated and it may contain old value
            */
            if(!addedCurrentIncome && currentIncome < currentTaxModel.totalIncome && currentIncome + INCREMENT > currentTaxModel.totalIncome){
            logger.log("Adding datapoint. Values: taxes due: " + currentTaxModel.totalTaxDue + ", total income: " + currentTaxModel.totalIncome);
            addedCurrentIncome = true;
            datasetTaxDue.push({x:  currentTaxModel.totalIncome, y: Math.floor(currentTaxModel.totalTaxDue), description: "Tax Due"});
            datasetNetIncome.push({x:  currentTaxModel.totalIncome, y:  Math.floor(currentTaxModel.totalIncome - currentTaxModel.totalTaxDue), description: "Net Income"});
            }
        }
    }    
    if(datasetTaxDue.length === 1 || datasetNetIncome.length === 1){
        //if there is only one data point then its insufficient to produce the graph. Clear the datasets, so we display blank graph instead of haphazar one.
        datasetTaxDue = [];
        datasetNetIncome = [];
    }


    //return object containing objects with datapoint for graph
    objectToReturn.datasetTaxDue = datasetTaxDue;
    objectToReturn.datasetNetIncome = datasetNetIncome;
    return objectToReturn;
}

export default graphDataSetGenerator;