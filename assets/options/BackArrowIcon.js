import React from 'react';
import Svg, { Path , Rect} from 'react-native-svg';

const BackArrowIcon = ({ width = 10, height = 17, fillColor = "none", strokeColor = "black"}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
      <Rect opacity="0.5" x="31" y="31" width="30" height="30" rx="15" transform="rotate(-180 31 31)" fill={fillColor} stroke={fillColor} stroke-width="1.5"/>
      <Path d="M19 24L11.5 16.5L19 9" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

  );
};

export default BackArrowIcon;
