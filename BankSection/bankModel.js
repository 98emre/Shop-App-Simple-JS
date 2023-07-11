
// Bank.js

export class BankModel {

    constructor(){
        this.bankBalance = 0;
        this.amountOfLoan = 0;
    }

    getBankBalance = ()  => this.bankBalance;
    setBankBalance = (newBankBalanceValue) => this.bankBalance = newBankBalanceValue

    getAmountOfLoan = () => this.amountOfLoan;
    setAmountOfLoan = (newLoanValue) =>  this.amountOfLoan = newLoanValue
}


