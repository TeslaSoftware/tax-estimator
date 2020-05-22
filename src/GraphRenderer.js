import React from 'react';
import colors from './colors';
import {VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryLegend, VictoryAxis, VictoryGroup, VictoryScatter, VictoryTooltip, VictoryArea, VictoryTheme} from 'victory'


class GraphRenderer extends React.Component{

render(){
     
    var graphDataSetTaxDue = this.props.graphDataSetTaxDue;
    var graphDataSetNetIncome = this.props.graphDataSetNetIncome;

   return (
      <VictoryChart
        domainPadding={{x: [0.5, 0.5], y: [0, 5]}}
        containerComponent={
          <VictoryVoronoiContainer           
            labels={({ datum }) => `Gross Income: $${datum.x}, \n ${datum.description} $${datum.y}`}
            labelComponent={
              <VictoryTooltip  dy={-7} constrainToVisibleArea />
            }
          />
        }
      >
        <VictoryLegend x={120} y={10}
          orientation="horizontal"
          gutter={20}
          style={{ border: { stroke: colors.primaryDarkColor } }}
          colorScale={[ colors.primaryLightColor, colors.secondaryLightColor]}
          data={[
            { name: "Tax Due" }, { name: "Net Income" }
          ]}
        />

        <VictoryAxis crossAxis
          label='Gross Income'
          style={{
            axis: {stroke: colors.primaryDarkColor},
            axisLabel: {fontSize: 16, padding: 30, fill: colors.primaryDarkColor},
            tickLabels: {fontSize: 12, padding: 8, fill: colors.primaryDarkColor},
            grid: {
              stroke: ({ tick }) => tick > 50000 ? colors.secondaryDarkColor : colors.primaryDarkColor ,
              opacity: 0.5,
              strokeDasharray: "10, 5",
            }            
          }}
        />

        <VictoryAxis dependentAxis crossAxis
          //label='Amount [$]'
          style={{
            axis: {stroke: colors.primaryDarkColor},
            axisLabel: {fontSize: 16, padding: 30, fill: colors.primaryDarkColor},
            tickLabels: {fontSize: 12, padding: 8, fill: colors.primaryDarkColor},
            grid: {
              stroke: colors.primaryDarkColor, 
              opacity: 0.5,
              strokeDasharray: "10, 5",
            }
          }}
        />
        
        

        
        <VictoryArea
          name = "Net Income"
          interpolation="catmullRom"
          data={graphDataSetNetIncome}
          style={{
            data: { stroke: colors.secondaryColor, fill: colors.secondaryLightColor, opacity: 0.75, }
          }}
          //draw the line - animation
          animate={{
            duration: 500,
            onLoad: { duration: 1000 }
          }}
        />

        <VictoryArea
            name = "series-1"
            interpolation="catmullRom"
            data={graphDataSetTaxDue}
            style={{
              data: { stroke: colors.primaryColor , fill: colors.primaryLightColor, opacity: 0.75, }
            }}
            //draw the line - animation
            animate={{
              duration: 500,
              onLoad: { duration: 1000 }
            }}
        />

        {this.props.balance < 0 &&
        //render only if balance is larger then zero - to avoid poorly looking graph
        <VictoryScatter
          symbol="star"
          size={7}
          style={{ data: { 
            stroke: colors.primaryColor , 
            fill: colors.primaryLightColor,
            strokeWidth: 2
            } }}
          data = {[{ x: this.props.totalIncome, y: Math.floor(this.props.totalTaxDue), description: "Current Tax Due:"  }]}        
        />
        }

        {this.props.balance < 0 &&
        //render only if balance is larger then zero - to avoid poorly looking graph
        <VictoryScatter
          symbol="star"
          size={7}
          style={{ data: { 
            stroke: colors.secondaryColor, 
            fill: colors.secondaryLightColor,
            strokeWidth: 2
            } }}
          data = {[{ x: this.props.totalIncome, y: Math.floor(this.props.totalIncome - this.props.totalTaxDue), description: "Current Net Income:" }]}        
        />
        }


      </VictoryChart>
   )
  }
}

export default GraphRenderer;