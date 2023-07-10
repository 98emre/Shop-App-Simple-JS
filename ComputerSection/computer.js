

// computer.js

import { fetchComputers,getComputerImageURL } from "../API/api.js";
import { getBankBalance, setBankBalance, updateBankUI } from "../BankSection/bank.js";

let computer = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    features: [],
    image: ""
  };
  
let data = [];

const computerNameElement = document.getElementById("computerTitle");
const computerPriceElement = document.getElementById("computerPrice");
const computerDescriptionElement = document.getElementById("computerDescription");
const computerFeaturesElement = document.getElementById("computerFeatures");
const computerImageElement = document.getElementById("computerImage");
const computerSelectElement = document.getElementById("computerSelect");
const btnBuyComputerElement = document.getElementById("btn-handleBuyComputer")


computerSelectElement.addEventListener("change", (event) => {
    const selectedComputer = data.find(item => item.id === parseInt(event.target.value))

    if(selectedComputer != null || selectedComputer != undefined){ 
        computer.id = selectedComputer.id
        computer.title = selectedComputer.title
        computer.price = selectedComputer.price
        computer.description = selectedComputer.description
        computer.features = selectedComputer.specs
        computer.image = `${getComputerImageURL()}${selectedComputer.image}` 
        
        updateComputerUI()
    }
})

btnBuyComputerElement.addEventListener("click",handleBuyComputer);


updateComputerUI();


function updateComputerUI() {
    computerNameElement.textContent = computer.title.toString();
    computerPriceElement.textContent = computer.price.toString();
    computerDescriptionElement.textContent = computer.description.toString();
    computerImageElement.src = computer.image; 
  
    computerFeaturesElement.innerHTML = ""; // Make sure to reset
  
    computer.features.forEach((feature) => {
      const featureElement = document.createElement("li");
      featureElement.textContent = feature;
      computerFeaturesElement.appendChild(featureElement);
    });
  
    if(computer.features.length > 0){
      document.querySelector(".computer-features-title").removeAttribute("hidden");
    }
}

function handleBuyComputer(){
    if(computer.price<=0){
        alert("You must select a computer");
        return;
    }

    if(computer.price > getBankBalance()){
        alert("You need more money")
        return;
    }

    const newPrice = getBankBalance() - computer.price
    setBankBalance(newPrice);
    updateBankUI()
    alert("You are now the owner of the new laptop!!")
}   
  


function computerOptions(computers) {
  computers.forEach((computer) => {
    const optionElement = document.createElement("option");
    optionElement.value = computer.id;
    optionElement.textContent = computer.title;
    computerSelectElement.appendChild(optionElement);
  });
}

fetchComputers()
  .then((result) => {
    data = result; 
    computerOptions(data);
  })
  .catch((error) => {
    console.error("Error fetching computers:", error);
});