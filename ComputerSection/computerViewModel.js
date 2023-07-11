

import { ComputerModel } from "./computerModel.js";
import { fetchComputers, getComputerImageURL } from "../API/api.js";

export class ComputerViewModel {

  constructor(bankViewModel) {
    this.bankViewModel = bankViewModel;
    this.computerModel = new ComputerModel();

    this.computerNameElement = document.getElementById("computerTitle");
    this.computerPriceElement = document.getElementById("computerPrice");
    this.computerDescriptionElement = document.getElementById("computerDescription");
    this.computerFeaturesElement = document.getElementById("computerFeatures");
    this.computerImageElement = document.getElementById("computerImage");
    this.selectComputerElement = document.getElementById("selectComputer");
    this.btnBuyComputerElement = document.getElementById("btn-handleBuyComputer");

    this.btnBuyComputerElement.addEventListener("click", () => this.handleBuyComputer());
    this.selectComputerElement.addEventListener("change", (event) => this.handleComputerSelect(event));

    this.fetchAndPopulate();
    this.updateComputerUI()
  }

  updateComputerUI() {
    const computer = this.computerModel.getComputer();
   
    this.computerNameElement.textContent = computer.title.toString();
    this.computerPriceElement.textContent = computer.price.toString();
    this.computerDescriptionElement.textContent = computer.description.toString();
    this.computerImageElement.src = computer.image.toString();

    this.computerFeaturesElement.innerHTML = ""; // Make sure to reset

    computer.features.forEach((feature) => {
      const featureElement = document.createElement("li");
      featureElement.textContent = feature;
      this.computerFeaturesElement.appendChild(featureElement);
    });

    if (computer.features.length > 0) {
      document.querySelector(".computer-features-title").removeAttribute("hidden");
    }
  }

  fetchAndPopulate() {
    fetchComputers()
      .then((result) => {
        this.computerModel.setData(result);

        result.forEach((computer) => {
          const optionElement = document.createElement("option");
          optionElement.value = computer.id;
          optionElement.textContent = computer.title;
          this.selectComputerElement.appendChild(optionElement);
        });
      })
      .catch((error) => console.error("Error fetching computers:", error));
  }
  

  handleBuyComputer() {
    const computer = this.computerModel.getComputer();
    const bankModel = this.bankViewModel.getBankModel();

    if (computer.price <= 0) {
      alert("You must select a computer");
      return;
    }

    if (computer.price > bankModel.getBankBalance()) {
      alert("You need more money");
      return;
    }

    //const newPrice = bankBalance - computer.price;
    bankModel.setBankBalance(bankModel.getBankBalance() - computer.price);
    this.bankViewModel.updateBankUI();
    alert("You are now the owner of the new laptop!!");
  }

  handleComputerSelect(event){
    const computer = this.computerModel.getComputer();

    const selectedComputer = this.computerModel.getData().find((item) => item.id === parseInt(event.target.value));

    if (selectedComputer != null || selectedComputer != undefined) {
      computer.id = selectedComputer.id;
      computer.title = selectedComputer.title;
      computer.price = selectedComputer.price;
      computer.description = selectedComputer.description;
      computer.features = selectedComputer.specs;
      computer.image = `${getComputerImageURL()}${selectedComputer.image}`;
    }

    this.updateComputerUI()      
  }
}
