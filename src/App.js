import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const logos = {
  react: "devicon-react-original-wordmark",
  python: "devicon-python-plain-wordmark",
  node: "devicon-nodejs-plain-wordmark",
  typescript: "devicon-typescript-plain",
  aws: "devicon-amazonwebservices-plain-wordmark",
  github: "devicon-github-original-wordmark"
}

const cardImages = [
  { src: logos.python, matched: false },
  { src: logos.react, matched: false },
  { src: logos.node, matched: false },
  { src: logos.typescript, matched: false },
  { src: logos.aws, matched: false },
  { src: logos.github, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return{ ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  };

  return (
    <div className='App'>
      <h1>Technical Skills</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
