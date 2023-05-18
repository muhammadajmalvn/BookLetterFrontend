import React from 'react';
import Card from './Card';

const Row = ({ cards }) => {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default Row;
