// computer.js

export class ComputerModel {
  constructor() {
    this.computer = {
      id: 0,
      title: "",
      price: 0,
      description: "",
      features: [],
      image: "",
    };

    this.data = [];
  }

  setComputer = (newComputer) => this.computer = newComputer;
  getComputer = () => this.computer;

  setData = (newData) => this.data = newData;
  getData = () => this.data;
}
