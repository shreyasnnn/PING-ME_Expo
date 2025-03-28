import React from 'react';
import Svg, { Path , Rect} from 'react-native-svg';

const ChatIcon = ({ width = 10, height = 17, fillColor = "none", strokeColor="white"}) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
<Path d="M9 17C13.4182 17 17 13.4182 17 9C17 4.58172 13.4182 1 9 1C4.58172 1 1 4.58172 1 9C1 10.2798 1.3005 11.4893 1.83477 12.562C1.97675 12.847 2.02401 13.1729 1.9417 13.4805L1.46521 15.2614C1.25836 16.0344 1.96561 16.7416 2.73868 16.5348L4.51951 16.0583C4.82714 15.976 5.15297 16.0233 5.43802 16.1652C6.5107 16.6995 7.72024 17 9 17Z" stroke={strokeColor} stroke-width="1.5"/>
<Path opacity="0.8" d="M5.8 7.8H12.2" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
<Path opacity="0.7" d="M5.8 10.6H10.2" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
</Svg>




  );
};

export default ChatIcon;
