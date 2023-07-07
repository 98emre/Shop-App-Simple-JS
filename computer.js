

// computer.js

import { fetchComputers } from "./api.js";

const computerNameElement = document.getElementById("computerTitle");
const computerPriceElement = document.getElementById("computerPrice");
const computerDescriptionElement = document.getElementById("computerDescription");
const computerFeaturesElement = document.getElementById("computerFeatures");
const computerImageElement = document.getElementById("computerImage");
const computerSelectElement = document.getElementById("computerSelect");

let computer = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  features: [],
  image: ""
};

let data = [];


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

function setComputer(newComputer) {  
    
  computer.id = newComputer.id
  computer.title = newComputer.title
  computer.price = newComputer.price
  computer.description = newComputer.description
  computer.features = newComputer.specs
  computer.image = `https://hickory-quilled-actress.glitch.me/${newComputer.image}` 
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



computerSelectElement.addEventListener("change", (event) => {
    const selectedComputer = data.find(item => item.id === parseInt(event.target.value))
    if(selectedComputer != null || selectedComputer != undefined){
        setComputer(selectedComputer)
        console.log(computer)
        updateComputerUI()
    }
})


export default {
  setComputer,
};
