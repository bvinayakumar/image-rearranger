import { CardProps } from "@/types/CardProps";
import { createContext } from "react";

export interface CardsContext {
  cards: CardProps[];
  cardOrder: number[];
  setCards: (newState: CardProps[]) => void;
  setCardOrder: (newState: number[]) => void;
}

export const CardsContext = createContext<CardsContext>({
  cards: [],
  cardOrder: [],
  setCards: () => {},
  setCardOrder: () => {},
});
