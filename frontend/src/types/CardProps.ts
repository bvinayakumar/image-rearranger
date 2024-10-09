export interface CardProps {
  id: number;
  title: string;
  position: number;
  onClick: (id: number) => void;
}
