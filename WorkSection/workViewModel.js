

// Work View Model

import workModel from "./workModel.js";
import bankModel from "../BankSection/bankModel.js";
import { displayBankUI } from "../BankSection/bankViewModel.js";

const payBalanceElement = document.getElementById("payBalance");
const btnWork = document.getElementById("btn-handleWork");
const btnTransfer = document.getElementById("btn-handleTransfer");
const btnRepayLoan = document.getElementById("btn-handleRepayLoan");

btnWork.addEventListener("click", () => handleWorkClick());
btnTransfer.addEventListener("click", () => handleTransferClick());
btnRepayLoan.addEventListener("click", () => handleRepayLoanClick());

document.addEventListener("DOMContentLoaded", () =>  displayWorkUI() );

const displayWorkUI = () => (payBalanceElement.innerHTML = `Pay: ${workModel.getPayBalance()} kr`);

function handleWorkClick() {
  workModel.setPayBalance(workModel.getPayBalance() + 100);
  displayWorkUI();
}

function handleTransferClick() {
  const getPayBalance = workModel.getPayBalance();

  if (getPayBalance <= 0) {
    alert("You have no money, go work");
    return;
  }

  if (bankModel.getAmountOfLoan() > 0) {
    const newBankBalanceValue = bankModel.getBankBalance() + getPayBalance * 0.9;
    const newLoanValue = bankModel.getAmountOfLoan() - getPayBalance * 0.1;

    bankModel.setAmountOfLoan(newLoanValue);
    bankModel.setBankBalance(newBankBalanceValue);

    if (newLoanValue <= 0) {
      document.getElementById("btn-handleRepayLoan").setAttribute("hidden", "");
      bankModel.setAmountOfLoan(0);
      document.getElementById("amountOfLoan").setAttribute("hidden","")
    }
  } else {
    bankModel.setBankBalance(bankModel.getBankBalance() + getPayBalance);
  }

  workModel.setPayBalance(0);

  displayWorkUI();
  displayBankUI();
}

function handleRepayLoanClick() {
  const newLoanValue = bankModel.getAmountOfLoan() - workModel.getPayBalance();

  if (workModel.getPayBalance() <= 0) {
    alert("You have no money, go work");
    return;
  }

  if (newLoanValue > 0) {
    workModel.setPayBalance(0);
  }

  if (newLoanValue <= 0) {
    workModel.setPayBalance(
      workModel.getPayBalance() - bankModel.getAmountOfLoan()
    );
    const newBankBalanceValue =
      bankModel.getBankBalance() + workModel.getPayBalance();

    bankModel.setBankBalance(newBankBalanceValue);
    bankModel.setAmountOfLoan(0);
    workModel.setPayBalance(0);

    document.getElementById("btn-handleRepayLoan").setAttribute("hidden", "");
    document.getElementById("amountOfLoan").setAttribute("hidden","")
  } else {
    bankModel.setAmountOfLoan(newLoanValue);
  }

  displayBankUI();
  displayWorkUI();
}
