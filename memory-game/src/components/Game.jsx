import { useState, useEffect } from 'react';
import Card from './Card.jsx'
import { initialDataList, shuffle, fetchData } from './Helper.jsx';
import '../styles/styles.css';


function Game() {
    const [dataList, setDataList] = useState(initialDataList);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedCardID, setSelectedCardID] = useState(null);
    const [scoreCardArray, setScoreCardArray] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData(dataList, setDataList);
    }, []);
    
    useEffect(() => {
        if (score === dataList.length) {
            logWinner();
        }
    }, [score]);

    const handleSelectedCard = (id) => {
        if (!selectedCardID || !scoreCardArray.includes(id)) {
          setSelectedCardID(id);
          setScore((prevScore) => prevScore + 1);
          setScoreCardArray((prevArray) => [...prevArray, id]);
          setDataList(shuffle(dataList));
        } else if (selectedCardID === id || scoreCardArray.includes(id)) {
            handleBestScore();
        }
      };
    
    const handleBestScore = () =>{
        const newBestScore = Math.max(score, bestScore);
        setBestScore(newBestScore);
        setScore(0);
        setSelectedCardID(null);
        setScoreCardArray([]);
        setDataList(shuffle(dataList));
    }
    
    const logWinner = () => {
        setShowModal(true);
        handleBestScore();
    };

    const closeModal = () => {
        setShowModal(false);
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
            {showModal && (
                <div className="modal-container">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>x</span>
                        <p>Congratulations! You have finished the game.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;