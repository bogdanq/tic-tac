import React from "react";
import { ContentLoader } from "./content-loader";
import { Row } from "../atoms/row";

const ITEM_HEIGHT = 120;
const messageCount = Math.floor(window.innerHeight / ITEM_HEIGHT);

export const HomeLoader = () => {
  return (
    <Row>
      <ContentLoader
        viewBox={`0 0 350 ${window.innerHeight}`}
        width={350}
        height={window.innerHeight}
      >
        {Array.from({ length: messageCount }).map((_, index) => (
          <rect
            key={index}
            x="0"
            y={index * ITEM_HEIGHT}
            rx="4"
            ry="4"
            width="350"
            height="100"
          />
        ))}
      </ContentLoader>
      <ContentLoader
        viewBox={`0 0 ${window.innerWidth - 350} ${window.innerHeight}`}
        height={window.innerHeight}
      >
        <rect
          x="50"
          y="0"
          rx="4"
          ry="4"
          width={window.innerWidth - 350}
          height={window.innerHeight}
        />
      </ContentLoader>
    </Row>
  );
};
