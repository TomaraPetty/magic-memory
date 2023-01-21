import React from 'react';
import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
      <div className='text-wrapper'>
        <i
          className={`front ${card.src}`}
          // src={card.src}
          alt='card front'
        ></i>
        <img
          className='back'
          src='/img/computer.png'
          onClick={handleClick}
          alt='card back'
        />
      </div>
      </div>
    </div>
  );
}
