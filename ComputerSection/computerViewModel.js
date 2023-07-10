
import { fetchComputers, getComputerImageURL} from "../API/api.js";
import { ComputerModel } from "./computerModel.js";
import { BankViewModel } from "../BankSection/bankViewModel.js";

export class ComputerViewModel {
  constructor() {
    this.computerModel = new ComputerModel();
    this.BankViewModel = new BankViewModel();

    this.computerNameElement = document.getElementById("computerTitle");
    this.computerPriceElement = document.getElementById("computerPrice");
    this.computerDescriptionElement = document.getElementById("computerDescription");
    this.computerFeaturesElement = document.getElementById("computerFeatures");
    this.computerImageElement = document.getElementById("computerImage");
    this.computerSelectElement = document.getElementById("computerSelect");
    this.btnBuyComputerElement = document.getElementById("btn-handleBuyComputer");

    this.computerSelectElement.addEventListener("change", this.handleComputerChange.bind(this));
    this.btnBuyComputerElement.addEventListener("click", this.handleBuyComputer.bind(this));

    this.updateComputerUI();
    this.fetchComputersData();
  }

  handleComputerChange(event) {
    const selectedComputerId = parseInt(event.target.value);
    const selectedComputer = this.data.find(item => item.id === selectedComputerId);

    if (selectedComputer) {
      this.computerModel.setComputer(selectedComputer);
      this.updateComputerUI();
    }
  }

  handleBuyComputer() {
    const computer = this.computerModel.getComputer();

    if (this.computerModel.getComputer().price <= 0) {
      alert("You must select a computer");
      return;
    }

    if (this.computerModel.getComputer().price > getBankBalance()) {
      alert("You need more money");
      return;
    }

    const newPrice = this.BankViewModel.getBankModel().getBankBalance() - this.computerModel.getComputer().price;
    this.BankViewModel.getBankModel().setBankBalance(newPrice);
    this.BankViewModel.updateBankUI();
    alert("You are now the owner of the new laptop!!");
  }

  updateComputerUI() {
    const computer = this.computerModel.getComputer();

    this.computerNameElement.textContent = computer.title.toString();
    this.computerPriceElement.textContent = computer.price.toString();
    this.computerDescriptionElement.textContent = computer.description.toString();
    this.computerImageElement.src = `${getComputerImageURL}${computer.image}`;

    this.computerFeaturesElement.innerHTML = "";

    computer.features.forEach((feature) => {
      const featureElement = document.createElement("li");
      featureElement.textContent = feature;
      this.computerFeaturesElement.appendChild(featureElement);
    });

    if (computer.features.length > 0) {
      document.querySelector(".computer-features-title").removeAttribute("hidden");
    }
  }

  fetchComputersData() {
    fetchComputers()
      .then((result) => {
        this.data = result;
        this.computerOptions(this.data);
      })
      .catch((error) => {
        console.error("Error fetching computers:", error);
      });
  }

  computerOptions(computers) {
    computers.forEach((computer) => {
      const optionElement = document.createElement("option");
      optionElement.value = computer.id;
      optionElement.textContent = computer.title;
      this.computerSelectElement.appendChild(optionElement);
    });
  }
}
