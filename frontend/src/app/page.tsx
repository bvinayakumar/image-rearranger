"use client";

import CardGrid from "@/components/CardGrid";
import { DraggableCardProps } from "@/types/DraggableCardProps";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [cards, setCards] = useState<DraggableCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        const data: DraggableCardProps[] = await response.json();
        setCards(data.map((card, index) => ({ ...card, id: index })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <CardGrid cards={cards} />
      </div>
    </DndProvider>
  );
}
