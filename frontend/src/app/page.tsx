"use client";

import CardGrid from "@/components/CardGrid";
import { CardsContext } from "@/components/CardsContext";
import Spinner from "@/components/Spinner";
import config from "@/config/config";
import { CardProps } from "@/types/CardProps";
import { UpdateCardProps } from "@/types/UpdateCardProps";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [cardOrder, setCardOrder] = useState<number[]>([]);
  const [previousCardOrder, setPreviousCardOrder] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<number>();
  const { apiBaseUrl } = config;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/documents`);
        const cards: CardProps[] = await response.json();
        const sortedCards: CardProps[] = cards.sort(
          (a, b) => a.position - b.position
        );
        setCards(sortedCards);
        setCardOrder(sortedCards.map((card) => card.id));
        setPreviousCardOrder(sortedCards.map((card) => card.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (!isEqual(cardOrder, previousCardOrder)) {
        setIsSaving(true);
        setPreviousCardOrder(cardOrder);

        let updateCards: UpdateCardProps[] = [];
        cardOrder.forEach((id, index) => {
          const card = cards.find((c) => c.id === id);
          if (card && card.position != index) {
            updateCards.push({ id: card.id, position: index });
          }
        });

        fetch(`${apiBaseUrl}/documents`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateCards),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to save cards order");
            }
            return response.json();
          })
          .then((data) => {
            setLastSaveTime(Date.now());
          })
          .catch((error) => {
            console.error("Error saving cards order:", error);
          })
          .finally(() => {
            setIsSaving(false);
          });
      }
    }, 5000); // Adjust the interval to 5000 milliseconds (5 seconds)

    return () => clearInterval(saveInterval);
  }, [cards, cardOrder, previousCardOrder, isSaving]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <CardsContext.Provider
          value={{ cards, cardOrder, setCards, setCardOrder }}
        >
          <CardGrid cards={cards} />
        </CardsContext.Provider>
        {isSaving && <Spinner lastSaveTime={lastSaveTime} />}
      </div>
    </DndProvider>
  );
}
