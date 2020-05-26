import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import taxModel2019 from './taxModel2019';
import CONSTANTS from './constants';




describe("Suite to test TaxModel2019", ()=> {
    var model = new taxModel2019();
    
    beforeEach(() => {
        let app = new App();
        model.initFromState(app.getInitialState());
    });


    //Sanity check - if test is working
    test( 'Sanity check', () => {
        expect(1).toBe(1);
    });

    test( 'recalculate(): Single, Taxable Income $44,200, no dependants', () => {
        model.filingStatus = CONSTANTS.FILING_STATUS_VALUE.SINGLE;
        model.setWages(44200);
        model.recalculate();
        expect(model.getTotalTaxDue()).toBe(3646);
        expect(model.taxBracketRate).toBe(0.12);
        //needed to round to 2 decimal places and cast it back to number
        expect(model.effectiveTaxRate).toBeCloseTo(0.11, 2)
    });

    test( 'recalculate(): Single, Gross Income $62,200, no dependants', () => {
        model.filingStatus = CONSTANTS.FILING_STATUS_VALUE.SINGLE;
        model.setWages(62200);
        model.recalculate();
        expect(model.getTotalTaxDue()).toBe(6858);
        expect(model.taxBracketRate).toBe(0.22);
        expect(model.effectiveTaxRate).toBeCloseTo(0.14, 2)
    });

    test( 'recalculate(): Married jointly, Gross Income $40,000 each spouse, no dependants', () => {
        model.filingStatus = CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY;
        model.setWages(40000);
        model.setWagesSpouse(40000);
        model.recalculate();
        expect(model.getTotalTaxDue()).toBe(6284);
        expect(model.taxBracketRate).toBe(0.12);
        expect(model.effectiveTaxRate).toBeCloseTo(0.11, 2)
    });

});

