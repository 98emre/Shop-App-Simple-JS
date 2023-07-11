
import { BankViewModel } from "./BankSection/bankViewModel.js";
import { ComputerViewModel } from "./ComputerSection/computerViewModel.js";
import { WorkViewModel } from "./WorkSection/workViewModel.js";


const bankViewModel = new BankViewModel();
const workViewModel = new WorkViewModel(bankViewModel);
const computerViewModel = new ComputerViewModel(bankViewModel);

