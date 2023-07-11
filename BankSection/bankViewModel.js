

// Bank View Model

import bankModel from "./bankModel.js";

const bankBalanceElement = document.getElementById("bankBalance");
const amountOfLoanElement = document.getElementById("amountOfLoan");
const btnGetLoanElement = document.getElementById("btn-handleGetLoan");

btnGetLoanElement.addEventListener("click", () => handleGetLoanClick());

document.addEventListener("DOMContentLoaded", () => {
    displayBankUI();
});


export function displayBankUI() {
  bankBalanceElement.innerHTML = `Balance: ${bankModel.getBankBalance()} kr`;
  amountOfLoanElement.innerHTML = `Loan: ${bankModel.getAmountOfLoan()} kr`;
}

function handleGetLoanClick() {

  if (bankModel.getAmountOfLoan() > 0) {
    alert("You already have a loan");
    return;
  }

  let enterAmount = prompt("Enter the loan: ");

  if (enterAmount === null) {
    return;
  }

  if (isNaN(enterAmount) || enterAmount <= 0) {
    alert(`Error invalid input`);
    return;
  }

  if (bankBalance === 0) {
    alert("You have no money in the bank, go work");
    return;
  }

  if (parseInt(enterAmount) > bankModel.getBankBalance() * 2) {
    alert(`Loan cannot to be more than ${bankModel.getBankBalance() * 2} Kr`);
    return;
  }

  bankModel.setBankBalance(bankModel.getBankBalance() + parseInt(enterAmount));
  bankModel.setAmountOfLoan(bankModel.getAmountOfLoan() + parseInt(enterAmount));

  document.getElementById("btn-handleRepayLoan").removeAttribute("hidden");
  document.getElementById("amountOfLoan").removeAttribute("hidden")

  displayBankUI();
}
