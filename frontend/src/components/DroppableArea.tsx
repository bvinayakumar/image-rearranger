import { CardProps } from "@/types/CardProps";
import { DroppableAreaProps } from "@/types/DroppableAreaProps";
import React from "react";
import { useDrop } from "react-dnd";

const DroppableArea: React.FC<DroppableAreaProps> = ({
  children,
  index,
  moveCard,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "card",
    drop: (item: CardProps) => {
      moveCard(item.id, index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return drop(<div className={isOver ? "isOver" : ""}>{children}</div>);
};

export default DroppableArea;
