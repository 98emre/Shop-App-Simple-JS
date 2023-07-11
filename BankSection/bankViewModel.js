


// Bank View Model

import { BankModel } from "./bankModel.js";


export class BankViewModel {

    constructor() {
        this.bankModel = new BankModel()
        this.bankBalanceElement = document.getElementById("bankBalance");
        this.amountOfLoanElement = document.getElementById("amountOfLoan");
        this.btnGetLoanElement = document.getElementById("btn-handleGetLoan")
        this.btnGetLoanElement.addEventListener("click", () => this.handleGetLoan());

        this.updateBankUI();
    }

    getBankModel = () => this.bankModel

    updateBankUI(){
        this.bankBalanceElement.textContent = this.bankModel.getBankBalance().toString();
        this.amountOfLoanElement.textContent = this.bankModel.getAmountOfLoan().toString();
    }


    handleGetLoan() {
        
        const bankBalance = this.bankModel.getBankBalance();
        const amountOfLoan = this.bankModel.getAmountOfLoan();
        
        if (amountOfLoan > 0) {
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

        if(bankBalance === 0){
             alert("You have no money in the bank, go work")
            return;
        }

        if (parseInt(enterAmount) > bankBalance * 2) {
            alert(`Loan cannot to be more than ${bankBalance*2} Kr`);
            return;
        }
        
        this.bankModel.setBankBalance(bankBalance + parseInt(enterAmount))
        this.bankModel.setAmountOfLoan(amountOfLoan + parseInt(enterAmount))
        document.getElementById("btn-handleRepayLoan").removeAttribute("hidden");

        this.updateBankUI();
    }
}


