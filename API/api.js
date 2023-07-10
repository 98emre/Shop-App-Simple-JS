
// Api.js

const URL = "https://hickory-quilled-actress.glitch.me/"


export const getComputerImageURL = () => URL 

export async function fetchComputers() {
    try {
      const response = await fetch('../Database/data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching computers:', error);
      return [];
    }
  }



  