

// Work.js

import { getAmountOfLoan, setAmountOfLoan,getBankBalance, setBankBalance, updateBankUI } from './bank.js';

let payBalance = 0;


const payElementContext = document.getElementById("payBalance");
const btnWork = document.getElementById("btn-handleWork");
const btnTransfer = document.getElementById("btn-handleTransfer")
const btnRepayLoan = document.getElementById("btn-handleRepayLoan");

btnWork.addEventListener("click", handleWork);
btnTransfer.addEventListener("click", handleTransfer);
btnRepayLoan.addEventListener("click", handleRepayLoan);

payElementContext.textContent = payBalance.toString();

function updateWorkUI() {
  payElementContext.textContent = payBalance.toString();
}

function handleWork() {
  payBalance += 100;
  updateWorkUI();
}

function handleTransfer() {

    if(payBalance<=0){
        alert("You have no money, go work")
        return;
    }

    if(getAmountOfLoan() > 0){
        const newBankBalanceValue = getBankBalance() + payBalance*0.9
        const newLoanValue = getAmountOfLoan() - payBalance*0.1

        setAmountOfLoan(newLoanValue)
        setBankBalance(newBankBalanceValue)

        if(newLoanValue < 0){
            document.querySelector(".repayLoan-button").setAttribute("hidden","");
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


function handleRepayLoan() {
    const newLoanValue = getAmountOfLoan() - payBalance

    if(payBalance<=0){
        alert("You have no money, go work")
        return;
    }

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

