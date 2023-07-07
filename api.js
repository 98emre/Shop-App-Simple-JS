
// Api.js

export async function fetchComputers() {
    try {
      const response = await fetch('./data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching computers:', error);
      return [];
    }
  }
  