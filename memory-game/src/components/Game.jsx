import { useState, useEffect } from 'react';
import Card from './Card.jsx'
import { initialDataList, shuffle } from './Helper.jsx';
import '../styles/styles.css';


function Game() {
    const [dataList, setDataList] = useState(initialDataList);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedCardID, setSelectedCardID] = useState(null);
    const [scoreCardArray, setScoreCardArray] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            try {
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

        fetchData();

        // Cleanup function to abort the fetch request if the component unmounts
        return () => {
            abortController.abort();
        };
    }, []);

    const handleSelectedCard = (id) => {
        if (!selectedCardID || !scoreCardArray.includes(id)) {
          setSelectedCardID(id);
          setScore((prevScore) => prevScore + 1);
          setScoreCardArray((prevArray) => [...prevArray, id]);
          setDataList(shuffle(dataList));
        } else if (selectedCardID === id || scoreCardArray.includes(id)) {
          const newBestScore = Math.max(score, bestScore);
          setBestScore(newBestScore);
          setScore(0);
          setSelectedCardID(null);
          setScoreCardArray([]);
          setDataList(shuffle(dataList));
        }
      };

    return (
        <div className="game-container">
            <div className="text-container">
                <h1>Pokemons Memory Game</h1>
                <div className="score-container">
                    <p className="score">Score: {score}</p>
                    <p className="best-score">Best Score: {bestScore}</p>
                </div>
            </div>
            <Card dataList={dataList} handleClickCard={handleSelectedCard} />
        </div>
    );
}

export default Game;