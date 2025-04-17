import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ReplyIcon({
  height = 24,
  width = 24,
  fillColor = '#000000',
  strokeColor = 'none',
}) {
  return (
    <Svg
      height={height}
      width={width}
      viewBox="0 0 288.926 288.926"
      fill="none"
    >
      <Path
        d="M235.656,133.414c-24.775-24.776-55.897-41.771-89.999-49.146c-21.59-4.67-43.696-5.347-65.303-2.149v-55.21L0,107.07
        l80.354,80.546v-75.08c48.282-8.498,98.84,6.842,134.089,42.091c28.685,28.685,44.482,66.824,44.482,107.391h30
        C288.926,213.437,270.008,167.765,235.656,133.414z"
        fill={fillColor}
        stroke={strokeColor}
      />
    </Svg>
  );
}
