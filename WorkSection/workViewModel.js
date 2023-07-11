// Work.js

import { WorkModel } from "./workModel.js";

export class WorkViewModel {
  constructor(bankViewModel) {
    this.workModel = new WorkModel();
    this.bankViewModel = bankViewModel;

    this.payElementContext = document.getElementById("payBalance");
    this.btnWork = document.getElementById("btn-handleWork");
    this.btnTransfer = document.getElementById("btn-handleTransfer");
    this.btnRepayLoan = document.getElementById("btn-handleRepayLoan");

    this.btnWork.addEventListener("click", () => this.handleWork());
    this.btnTransfer.addEventListener("click", () => this.handleTransfer());
    this.btnRepayLoan.addEventListener("click", () => this.handleRepayLoan());

    this.updateWorkUI();
  }

  updateWorkUI = () => {
    this.payElementContext.textContent = this.workModel.getPayBalance().toString();
    this.bankViewModel.updateBankUI();
  };

  handleWork() {
    this.workModel.setPayBalance(this.workModel.getPayBalance() + 100);
    this.updateWorkUI();
  }

  handleTransfer() {
    const bankModel = this.bankViewModel.getBankModel();
    const getPayBalance = this.workModel.getPayBalance();

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
      }
    } 
    
    else {
      bankModel.setBankBalance(bankModel.getBankBalance() + getPayBalance);
    }

    this.workModel.setPayBalance(0);
    this.updateWorkUI();
    this.bankViewModel.updateBankUI();
  }

  handleRepayLoan() {
    const bankModel = this.bankViewModel.getBankModel();
    const newLoanValue = bankModel.getAmountOfLoan() - this.workModel.getPayBalance();

    if (this.workModel.getPayBalance() <= 0) {
      alert("You have no money, go work");
      return;
    }

    if (newLoanValue > 0) {
      this.workModel.setPayBalance(0);
    }

    if (newLoanValue <= 0) {
      this.workModel.setPayBalance(this.workModel.getPayBalance() - bankModel.getAmountOfLoan());
      const newBankBalanceValue = bankModel.getBankBalance() + this.workModel.getPayBalance();

      bankModel.setBankBalance(newBankBalanceValue);
      bankModel.setAmountOfLoan(0);
      this.workModel.setPayBalance(0);

      document.getElementById("btn-handleRepayLoan").setAttribute("hidden", "");
    } 
    
    else {
      bankModel.setAmountOfLoan(newLoanValue);
    }

    this.updateWorkUI();
  }
}
