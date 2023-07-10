
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

const getBankBalance = ()  => bankBalance;
const setBankBalance = (newBankBalanceValue) => bankBalance = newBankBalanceValue

const getAmountOfLoan = () => amountOfLoan;
const setAmountOfLoan = (newLoanValue) =>  amountOfLoan = newLoanValue



function handleGetLoan() {
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

    bankBalance += parseInt(enterAmount);
    amountOfLoan += parseInt(enterAmount);

    document.getElementById("btn-handleRepayLoan").removeAttribute("hidden");
    updateBankUI();
}


export { setAmountOfLoan, getAmountOfLoan,
        getBankBalance, setBankBalance, 
        updateBankUI 
};


