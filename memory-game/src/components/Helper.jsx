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

