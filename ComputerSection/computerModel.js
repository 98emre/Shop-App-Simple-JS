

// Computer Model

let computer = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  features: [],
  image: "",
};

let computerDataInfos = [];

const setComputer = (newComputer) => computer = newComputer;
const getComputer = () => computer;

const setComputerDataInfos = (newComputerDataInfos) => computerDataInfos = newComputerDataInfos;
const getComputerDataInfos = () => computerDataInfos;

const computerModel = {
  setComputer, getComputer,
  setComputerDataInfos, getComputerDataInfos
}

export default computerModel