# Tax Estimator

Tax Estimator is webapp that calculates taxes due based on user selected and entered information. Result show estimate if user will receive tax refund or if he/she will owe taxes. The app takes into consideration the following variables:
* filing status: 
    * single
    * married filing jointly
    * married filing separately
    * head of household
    * qualified widow(er)
* deduction type:
    * standard deduction - deduction determined as per filing status
    * itemized deduction - user is allowed to enter total of itemized decutions
* number of dependants: 
    * dependant children and
    * dependant qualified relatives  
* other deductions:
    *  pre-tax decutions -additional deducation amount that is deducted from gross income to produce AGI
    *  tax credits - additional tax credits deducted from tax due to lower the final tax value
* W2 information:
    * wages (and spouse wages if filing status is married filing jointly)
    * tax withheld (and spouse tax withheld if filing status is married filing jointly)

Results also display graph contianing projections that answer questions such as "how much taxes would I have to pay if I would make more/or less money this year?"
Please note that this app calculates only federal taxes (state tax calculations are not available).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
* npm (Node Package Manager) - download from  https://www.npmjs.com/get-npm
* ReactJS - install via npm by running  ```npm i react```
* SASS - install via npm by running ``` npm install -g sass```
* Victory - install via npm by running ```npm i victory```

### Local Deployment

In the project directory, enter the following command to run the app dev mode:
```
npm start
```
Open http://localhost:3000 to view it in the browser. All the changes to code will be applied in realtime.


## Running the tests

TO-DO

## Built With

* [ReactJS](https://reactjs.org/) - Front-end framework
* [Victory](https://formidable.com/open-source/victory/) - Graphs framework compatible with ReactJS
* [SASS](https://sass-lang.com/) - Used to generate CSS (CSS preprocessor)


## Authors

* **Sebastian Tysler** - *Initial work* - [Tesla Software](https://github.com/teslaSoftware)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Disclaimer

As much as I would love to stay accurate to produce most correct results it should not be considered as advice on how to file your tax returns. 
This webapplication provides only estimate. For advice regarding your taxes please conslut your CPA.