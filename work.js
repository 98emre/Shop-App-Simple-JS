

// Work.js

import { getAmountOfLoan, setAmountOfLoan,getBankBalance, setBankBalance, updateBankUI } from './bank.js';

let payBalance = 0;


let payElementContext = document.getElementById("payBalance");

payElementContext.textContent = payBalance.toString();

function updateWorkUI() {
  payElementContext.textContent = payBalance.toString();
}

function work() {
  payBalance += 100;
  updateWorkUI();
}

function transferPayBalanceToBank() {

    if(getAmountOfLoan() > 0){
        const newBankBalanceValue = getBankBalance() + payBalance*0.9
        const newLoanValue = getAmountOfLoan() - payBalance*0.1

        setAmountOfLoan(newLoanValue)
        setBankBalance(newBankBalanceValue)

        if(newLoanValue < 0){
            setAmountOfLoan(0)
        }
    }
    else{
        const newBankBalanceValue = getBankBalance() + payBalance
        setBankBalance(newBankBalanceValue);
    }
    
    payBalance = 0;
    updateBankUI();
    updateWorkUI();
}


function repayLoan() {
    const newLoanValue = getAmountOfLoan() - payBalance

    if(newLoanValue > 0){
        payBalance = 0;
    }

    if(newLoanValue < 0){        
        payBalance -= getAmountOfLoan()
        const newBankBalanceValue = getBankBalance() + payBalance;

        setBankBalance(newBankBalanceValue)
        setAmountOfLoan(0)
        payBalance = 0;
        document.querySelector(".repayLoan-button").setAttribute("hidden","");
    } 

    else{
        setAmountOfLoan(newLoanValue)
    }

    updateWorkUI()
    updateBankUI()
}

let workButton = document.querySelector("#workButton");
workButton.addEventListener("click", work);

let transferButton = document.querySelector("#transferButton");
transferButton.addEventListener("click", transferPayBalanceToBank);

let repayLoanButton = document.querySelector("#repayLoanButton");
repayLoanButton.addEventListener("click", repayLoan);