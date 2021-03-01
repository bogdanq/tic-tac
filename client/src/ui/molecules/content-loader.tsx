import React from "react";
import ReactContentLoader, { IContentLoaderProps } from "react-content-loader";

export const ContentLoader: React.FC<IContentLoaderProps> = ({
  title = "",
  speed = 1,
  height,
  preserveAspectRatio = "xMinYMin meet",
  children,
  style,
  ...rest
}) => {
  const computedStyles: React.CSSProperties = {
    ...(height ? { maxHeight: height } : {}),
    ...(style || {}),
  };

  return (
    <ReactContentLoader
      title={title}
      height={height}
      speed={speed}
      preserveAspectRatio={preserveAspectRatio}
      style={computedStyles}
      {...rest}
    >
      {children}
    </ReactContentLoader>
  );
};
