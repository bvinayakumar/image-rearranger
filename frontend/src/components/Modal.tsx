import { ModalProps } from "@/types/ModalProps";
import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  card,
  handleClose,
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const width = 200;
  const height = 250;

  const src = card
    ? `https://picsum.photos/id/${card.id}/${width}/${height}`
    : "";

  return (
    <ReactPortal wrapperId="react-portal-overlay-container">
      <div className="modal fixed inset-0 bg-black/60 flex flex-col items-center justify-center transition-all duration-300 ease-in-out overflow-hidden z-999 p-2">
        <h2>{card?.title}</h2>
        <div className="modal-content w-full text-white flex items-center justify-center text-2xl">
          <>
            <img src={src} height={height} width={width} alt={card?.title} />
          </>
          {children}
        </div>
        <button
          onClick={handleClose}
          className="py-2 px-8 font-bold hover:bg-violet-600 border rounded"
        >
          Close
        </button>
      </div>
    </ReactPortal>
  );
};

export default Modal;
