import React from "react";
import { cardData } from "../CardData";
import Card from "./Card";

const CardSection = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 pt-8 mb-10">
        {cardData.map((card) => {
          return (
            <div key={card.id}>
              <Card
                id={card.id}
                User={card.User}
                img={card.image}
                status={card.status}
              ></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSection;