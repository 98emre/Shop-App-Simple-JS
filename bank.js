
// Bank.js

const bankBalanceElement = document.getElementById("bankBalance");
const amountOfLoanElement = document.getElementById("amountOfLoan");
const btnGetLoanElement = document.getElementById("btn-handleGetLoan")

btnGetLoanElement.addEventListener("click", handleGetLoan);


let amountOfLoan = 0;
let bankBalance = 0;

function updateBankUI(){
    bankBalanceElement.textContent = bankBalance.toString();
    amountOfLoanElement.textContent = amountOfLoan.toString();
}

updateBankUI();

function getBankBalance(){
    return bankBalance;
}

function setBankBalance(newBankBalanceValue){
    bankBalance = newBankBalanceValue
}

function getAmountOfLoan(){
    return amountOfLoan;
}

function setAmountOfLoan(newLoanValue){
    amountOfLoan = newLoanValue
}


function handleGetLoan() {
    if (amountOfLoan > 0) {
        alert("You already have a loan");
        return;
    }

    var enterAmount = prompt("Enter the loan: ");
    
    if (enterAmount === null) {
        return;
    }

    enterAmount = parseInt(enterAmount);

    if (isNaN(enterAmount) || enterAmount <= 0) {
        alert("Invalid input for the loan");
        return;
    }

    if (enterAmount > bankBalance * 2) {
        alert("Loan cannot exceed double your balance");
        return;
    }

    bankBalance += enterAmount;
    amountOfLoan += enterAmount;

    document.querySelector(".repayLoan-button").removeAttribute("hidden");
    updateBankUI();
}


export { getAmountOfLoan, setAmountOfLoan,
        getBankBalance, setBankBalance, 
        updateBankUI 
    };


