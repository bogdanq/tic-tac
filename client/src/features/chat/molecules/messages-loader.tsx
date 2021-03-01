import React from "react";
import { ContentLoader } from "../../../ui";

const ITEM_HEIGHT = 120;
const messageCount = Math.floor(window.innerHeight / ITEM_HEIGHT);

export const MessagesLoader = () => {
  return (
    <ContentLoader viewBox={`0 0 350 ${window.innerHeight}`}>
      {Array.from({ length: messageCount }).map((_, index) => (
        <rect
          key={index}
          x="0"
          y={index * ITEM_HEIGHT}
          rx="4"
          ry="4"
          width="100%"
          height="100px"
        />
      ))}
    </ContentLoader>
  );
};
