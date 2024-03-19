export const initialDataList = [
    { id: 1, name: 'ditto', image: null },
    { id: 2, name: 'pikachu', image: null },
    { id: 3, name: 'charmander', image: null },
    { id: 4, name: 'bulbasaur', image: null },
    { id: 5, name: 'squirtle', image: null },
    { id: 6, name: 'pidgey', image: null },
    { id: 7, name: 'jigglypuff', image: null },
    { id: 8, name: 'geodude', image: null },
    { id: 9, name: 'rattata', image: null },
    { id: 10, name: 'koffing', image: null },
    { id: 11, name: 'ekans', image: null },
    { id: 12, name: 'meowth', image: null },
]

export function shuffle(array) {
    const newArray = [...array]; // Create a copy of the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements randomly
    }
    return newArray;
}

export const fetchData = async (dataList, setDataList) => {
  try {
      const abortController = new AbortController();
      const signal = abortController.signal;
      const updatedDataList = [];

      for (const object of dataList) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${object.name}`, { signal });
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          const jsonData = await response.json();
          const imageData = jsonData['sprites']['other']['official-artwork']['front_default'];
          updatedDataList.push({ ...object, image: imageData });
      }

      setDataList(updatedDataList);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

