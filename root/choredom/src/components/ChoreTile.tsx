import React from "react";

interface ChoreTileProps {
  toDoDate: string;
  choreName: string;
  choreDescription?: string;
  choreFrequency?: string;
}

const ChoreTile: React.FC<ChoreTileProps> = (props) => {
  return <div>Hello World</div>;
};

export default ChoreTile;
