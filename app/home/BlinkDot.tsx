import React, { CSSProperties, FC } from "react";
import styles from "./Home.module.scss";

interface BlinkDotProps {
  x: number;
  y: number;
}

const BlinkDot: FC<BlinkDotProps> = ({ x, y }) => {
  return (
    <span
      className={styles.dot}
      style={
        {
          "--x": x,
          "--y": y,
        } as CSSProperties
      }
    ></span>
  );
};

export default BlinkDot;
