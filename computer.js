
// computer.js

let computerNameElement = document.getElementById("computerName");
let computerPriceElement = document.getElementById("computerPrice");
let computerDescriptionElement = document.getElementById("computerDescription");
let computerFeaturesContainer = document.getElementById("computerFeaturesContainer");


let computerName = ""
let computerPrice = 0;
let computerDescription = ""
let computerFeatures = [] 

function updateComputerUI(){
    computerNameElement.textContent = computerName.toString();
    computerPriceElement.textContent = computerPrice.toString();
    computerDescriptionElement.textContent = computerDescription.toString();

    computerFeaturesContainer.innerHTML = "";

    computerFeatures.forEach(function(feature){
        let featureElement = document.createElement("li");
        featureElement.textContent = feature;
        computerFeaturesContainer.appendChild(featureElement);
    });
}

function getComputerName(){
    return computerName;
}

function setComputerName(newComputerName){
    computerName = newComputerName;
}

function getComputerPrice(){
    return computerPrice;
}

function setComputerPrice(newComputerPrice){
    computerPrice = newComputerPrice;
}

function getComputerDescription(){
    return computerDescription;
}

function setComputerDescription(newComputerDescription){
    computerDescription = newComputerDescription;
}

function getComputerFeatures(){
    return computerFeatures;
}

function setComputerFeatures(newComputerFeatures){
    computerFeatures = newComputerFeatures;
}

function addFeatures(item){
    computerFeatures.push(item);
}


export { 
    getComputerName, setComputerName, 
    getComputerPrice, setComputerPrice,
    getComputerDescription, setComputerDescription,
    getComputerFeatures, setComputerFeatures,addFeatures
};
