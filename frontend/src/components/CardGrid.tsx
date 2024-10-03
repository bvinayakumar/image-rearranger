import { CardGridProps } from "@/types/CardGridProps";
import React, { useEffect, useState } from "react";
import DraggableCard from "./DraggableCard";
import DroppableArea from "./DroppableArea";

const CardGrid: React.FC<CardGridProps> = ({ cards }: CardGridProps) => {
  const [cardOrder, setCardOrder] = useState(cards.map((card) => card.id));

  useEffect(() => {
    // Update cardOrder based on changes in cards
    setCardOrder(cards.map((card) => card.id));
  }, [cards]);

  const moveCard = (sourceCardId: number, destinationIndex: number) => {
    const sourceIndex = cardOrder.indexOf(sourceCardId);
    if (sourceIndex >= 0) {
      const newCardOrder = [...cardOrder];
      const [removed] = newCardOrder.splice(sourceIndex, 1);
      newCardOrder.splice(destinationIndex, 0, removed);
      setCardOrder(newCardOrder);
    }
  };

  const renderCards = () => {
    return cardOrder.map((cardId, index) => {
      const card = cards.find((card) => card.id === cardId);
      return (
        <DroppableArea key={cardId} index={index} moveCard={moveCard}>
          {card && (
            <DraggableCard key={card.id} id={card.id} title={card.title} />
          )}
        </DroppableArea>
      );
    });
  };

  return (
    <div className="card-grid grid grid-cols-3 gap-2 px-4">{renderCards()}</div>
  );
};

export default CardGrid;
