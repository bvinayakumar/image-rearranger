import { CardProps } from "./CardProps";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  card: CardProps | null;
  handleClose: () => void;
}
