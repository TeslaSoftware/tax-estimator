import CONSTANTS from './constants';

var taxBrackets = {};
taxBrackets[CONSTANTS.FILING_STATUS_VALUE.SINGLE] = {
    taxRate10Perc : {
        rate: 0.10,
        from: 0,
        to: 9700
    },
    taxRate12Perc : {
        rate: 0.12,
        from: 9701,
        to: 39475
    },
    taxRate22Perc : {
        rate: 0.22,
        from: 39476,
        to: 84200
    },
    taxRate24Perc : {
        rate: 0.24,
        from: 84201,
        to: 160725
    },
    taxRate32Perc : {
        rate: 0.32,
        from: 160726,
        to: 204100
    },
    taxRate35Perc : {
        rate: 0.35,
        from: 204101,
        to: 510300
    },
    taxRate37Perc : {
        rate: 0.37,
        from: 510301,
        to: Number.MAX_SAFE_INTEGER
    },
}

taxBrackets[CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_JOINTLY] = {
    taxRate10Perc : {
        rate: 0.10,
        from: 0,
        to: 19400
    },
    taxRate12Perc : {
        rate: 0.12,
        from: 19401,
        to: 78950
    },
    taxRate22Perc : {
        rate: 0.22,
        from: 78951,
        to: 168400
    },
    taxRate24Perc : {
        rate: 0.24,
        from: 168401,
        to: 321450
    },
    taxRate32Perc : {
        rate: 0.32,
        from: 324451,
        to: 408200
    },
    taxRate35Perc : {
        rate: 0.35,
        from: 408201,
        to: 612350
    },
    taxRate37Perc : {
        rate: 0.37,
        from: 612351,
        to: Number.MAX_SAFE_INTEGER
    },
}

taxBrackets[CONSTANTS.FILING_STATUS_VALUE.MARRIED_FILING_SEPERATELY] = {
    taxRate10Perc : {
        rate: 0.10,
        from: 0,
        to: 9700
    },
    taxRate12Perc : {
        rate: 0.12,
        from: 9701,
        to: 39475
    },
    taxRate22Perc : {
        rate: 0.22,
        from: 39476,
        to: 84200
    },
    taxRate24Perc : {
        rate: 0.24,
        from: 84201,
        to: 160725
    },
    taxRate32Perc : {
        rate: 0.32,
        from: 160726,
        to: 204100
    },
    taxRate35Perc : {
        rate: 0.35,
        from: 204101,
        to: 306175
    },
    taxRate37Perc : {
        rate: 0.37,
        from: 306176,
        to: Number.MAX_SAFE_INTEGER
    },
}

taxBrackets[CONSTANTS.FILING_STATUS_VALUE.HEAD_OF_HOUSEHOLD] = {
    taxRate10Perc : {
        rate: 0.10,
        from: 0,
        to: 13850
    },
    taxRate12Perc : {
        rate: 0.12,
        from: 13851,
        to: 52850
    },
    taxRate22Perc : {
        rate: 0.22,
        from: 52851,
        to: 84200
    },
    taxRate24Perc : {
        rate: 0.24,
        from: 84201,
        to: 160700
    },
    taxRate32Perc : {
        rate: 0.32,
        from: 160701,
        to: 204100
    },
    taxRate35Perc : {
        rate: 0.35,
        from: 204101,
        to: 510300
    },
    taxRate37Perc : {
        rate: 0.37,
        from: 510301,
        to: Number.MAX_SAFE_INTEGER
    },
}
console.log("brackets: " + taxBrackets);

export default taxBrackets;