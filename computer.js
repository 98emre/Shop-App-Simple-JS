// computer.js

import { fetchComputers } from "./api.js";

const computerNameElement = document.getElementById("computerTitle");
const computerPriceElement = document.getElementById("computerPrice");
const computerDescriptionElement = document.getElementById("computerDescription");
const computerFeaturesElement = document.getElementById("computerFeatures");
const computerImageElement = document.getElementById("computerImage");
const laptopSelectElement = document.getElementById("laptopSelect");

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
}

function setComputer(newComputer) {  
    
  computer.id = newComputer.id
  computer.title = newComputer.title
  computer.price = newComputer.price
  computer.description = newComputer.description
  computer.features = newComputer.specs
  computer.image = newComputer.image 
}

function laptopOptions(computers) {
  computers.forEach((computer) => {
    const optionElement = document.createElement("option");
    optionElement.value = computer.id;
    optionElement.textContent = computer.title;
    laptopSelectElement.appendChild(optionElement);
  });
}

fetchComputers()
  .then((result) => {
    data = result; 
    laptopOptions(data);
  })
  .catch((error) => {
    console.error("Error fetching computers:", error);
  });



laptopSelectElement.addEventListener("change", (event) => {
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
