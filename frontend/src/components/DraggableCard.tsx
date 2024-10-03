import { CardProps } from "@/types/CardProps";
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DraggableCard: React.FC<CardProps> = ({
  id,
  title,
  onClick,
}: CardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const width = 200;
  const height = 250;

  const src = `https://picsum.photos/id/${id}/${width}/${height}`;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error("Image failed to load");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [src]);

  return drag(
    <div
      className={`card ${isDragging ? "dragging" : ""}`}
      onClick={() => onClick(id)}
    >
      <h2>{title}</h2>
      <div>
        {isLoading ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={height} width={width} />
          </SkeletonTheme>
        ) : (
          <img src={src} height={height} width={width} alt={title} />
        )}
      </div>
    </div>
  );
};

export default DraggableCard;
