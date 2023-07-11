

import computerModel from "./computerModel.js"
import bankModel from "../BankSection/bankModel.js";
import { displayBankUI } from "../BankSection/bankViewModel.js";

import { fetchComputers, getComputerImageURL } from "../API/api.js";

  const computerNameElement = document.getElementById("computerTitle");
  const computerPriceElement = document.getElementById("computerPrice");
  const computerDescriptionElement = document.getElementById("computerDescription");
  const computerFeaturesElement = document.getElementById("computerFeatures");
  const computerImageElement = document.getElementById("computerImage");
 
  const selectComputerElement = document.getElementById("selectComputer");
  const btnBuyComputerElement = document.getElementById("btn-handleBuyComputer");

  btnBuyComputerElement.addEventListener("click", () => handleBuyComputerClick());
  selectComputerElement.addEventListener("change", (event) => handleComputerSelect(event));

  displayComputerUI();
  fetchAndPopulate();

  function displayComputerUI() {
    const computer = computerModel.getComputer()
   
    computerNameElement.innerHTML =  `${computer.title}`;
    computerPriceElement.innerHTML = `${computer.price} Kr`;
    computerDescriptionElement.innerHTML = `${computer.description}`;
    computerImageElement.src = `${computer.image}`;

    computerFeaturesElement.innerHTML = ""; // Make sure to reset

    computer.features.forEach((feature) => {
      const featureElement = document.createElement("li");
      featureElement.innerHTML = feature;
      computerFeaturesElement.appendChild(featureElement);
    });

    if (computer.features.length > 0) {
      document.querySelector(".computer-features-title").removeAttribute("hidden");
    }
    
    displayBankUI()
  }

  function fetchAndPopulate() {
    fetchComputers()
      .then((result) => {
        computerModel.setComputerDataInfos(result);

        result.forEach((computer) => {
          const optionElement = document.createElement("option");
          optionElement.value = computer.id;
          optionElement.innerHTML = computer.title;
          selectComputerElement.appendChild(optionElement);
        });
      })
      .catch((error) => console.error("Error fetching computers:", error));
  }
  

  function handleBuyComputerClick() {
    const computerPrice = computerModel.getComputer().price;
    const bankBalance = bankModel.getBankBalance();

    if (computerPrice <= 0) {
      alert("You must select a computer");
      return;
    }

    if (computerPrice > bankBalance) {
      alert("You need more money");
      return;
    }

    bankModel.setBankBalance(bankBalance - computerPrice);
    displayComputerUI()
    alert("You are now the owner of the new laptop!!");
  }

  function handleComputerSelect(event){
    const computer = computerModel.getComputer();
    const computers = computerModel.getComputerDataInfos();

    const selectedComputer = computers.find((item) => item.id === parseInt(event.target.value));

    if (selectedComputer != null || selectedComputer != undefined) {
      computer.id = selectedComputer.id;
      computer.title = selectedComputer.title;
      computer.price = selectedComputer.price;
      computer.description = selectedComputer.description;
      computer.features = selectedComputer.specs;
      computer.image = `${getComputerImageURL()}${selectedComputer.image}`;
    }

    displayComputerUI()      
  }

