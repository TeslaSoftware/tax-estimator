import React from 'react';
import {  render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import taxModel2019 from './taxModel2019';

test( 'Sanity check', () => {
  expect(1).toBe(1);
});

test('Test getting to last screen in UI for Tax Model 2019 ', async() => {
  render(<App /> );
  let model = new taxModel2019();
  let sectionMessages = ['What is your filing status', 'Which deduction mode you want to use', 
  'Do you have depenedants to claim' , 'YOUR W-2', 'Do you have any other deductions/tax credits', 'RESULTS'];
 
  for(let currentScreen = model.startScreenValue; currentScreen < model.endScreenValue-1; currentScreen++){
    let regex = new RegExp(sectionMessages[currentScreen],"i");
    //screen.debug 
    expect(screen.queryByText(regex)).toBeInTheDocument();    
    fireEvent.click(screen.getByText(/NEXT/i));     
    expect(screen.queryByText(regex)).not.toBeInTheDocument();
  }
  //click on calculate to get to last screen
  fireEvent.click(screen.getByText(/CALCULATE/i)); 
  expect(screen.getByText(/RESULTS/i)).toBeInTheDocument();
  
});