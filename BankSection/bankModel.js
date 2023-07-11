
// Bank.js


let bankBalance = 0;
let amountOfLoan = 0;

const getBankBalance = () => bankBalance;
const setBankBalance = (newBankBalanceValue) => bankBalance = newBankBalanceValue;
const getAmountOfLoan = () => amountOfLoan;
const setAmountOfLoan = (newLoanValue) => amountOfLoan = newLoanValue;


const bankModel = {
   getBankBalance, setBankBalance,
   getAmountOfLoan, setAmountOfLoan
};

export default bankModel;


