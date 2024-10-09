import { Icon } from "@iconify/react";
import React from "react";
import Timeago from "react-timeago";
import ReactPortal from "./ReactPortal";

interface SpinnerProps {
  lastSaveTime?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ lastSaveTime }) => {
  return (
    <ReactPortal wrapperId="react-portal-overlay-spinner">
      <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-999">
        <Icon icon="ph:spinner-gap" className="text-8xl animate-spin" />
        {lastSaveTime && <Timeago date={lastSaveTime} />}
      </div>
    </ReactPortal>
  );
};

export default Spinner;
