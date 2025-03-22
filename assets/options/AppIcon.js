import React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const MainIcon = (props) => {
  return (
    <Svg width={40} height={35} viewBox="0 0 1080 1080" {...props}>
      <G opacity={1}>
        <Path
          d="M0 12.461a6 6 0 0 1 6-6h9.436v22.077H6a6 6 0 0 1-6-6V12.461Z"
          fill="#ff3b7e"
          transform="translate(89.77 29.7) scale(29.16)"
        />
        <Path
          d="M15.436 6.461h9.436a6 6 0 0 1 6 6v10.077a6 6 0 0 1-6 6h-9.436V6.461Z"
          fill="#fc9"
          transform="translate(90.061 29.7) scale(29.16)"
        />
        <Path
          d="M6.641 6.461h11.59a6 6 0 0 1 6 6v16.077H12.64a6 6 0 0 1-6-6V6.461Z"
          fill="#fff"
          transform="translate(89.77 29.7) scale(29.16)"
        />
        <Path
          d="M17.949 0v6.462H6.64L17.949 0Z"
          fill="#fc9"
          transform="translate(90.061 29.7) scale(29.16)"
        />
        <Path
          d="M13.103 28.539H24.23L13.103 35V28.54Z"
          fill="#ff3b7e"
          transform="translate(89.77 29.7) scale(29.16)"
        />
        <Circle
          r={1.346}
          fill="#041e49"
          transform="translate(411.696 540) scale(29.16)"
        />
        <Circle
          r={1.346}
          fill="#041e49"
          transform="translate(537.376 540) scale(29.16)"
        />
        <Circle
          r={1.346}
          fill="#041e49"
          transform="translate(663.055 540) scale(29.16)"
        />
      </G>
    </Svg>
  );
};

export default MainIcon;
