export interface DroppableAreaProps {
  children: React.ReactNode;
  index: number;
  moveCard: (sourceIndex: number, destinationIndex: number) => void;
}
