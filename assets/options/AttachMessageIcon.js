import React from 'react';
import Svg, { Path , Rect} from 'react-native-svg';

const AttachMessageIcon = ({width=10, height=10, fillColor='041E49', strokeColor='#fff'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.9775 2.60538C8.73592 1.58436 10.7775 1 12.955 1C19.5575 1 24.91 6.37258 24.91 13C24.91 19.6274 19.5575 25 12.955 25C6.35243 25 1 19.6274 1 13C1 10.8143 1.58217 8.76504 2.59936 7" fill={fillColor}/>
<Path d="M6.9775 2.60538C8.73592 1.58436 10.7775 1 12.955 1C19.5575 1 24.91 6.37258 24.91 13C24.91 19.6274 19.5575 25 12.955 25C6.35243 25 1 19.6274 1 13C1 10.8143 1.58217 8.76504 2.59936 7" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
<Path d="M16.5414 12.9999H12.9549H16.5414ZM12.9549 12.9999H9.36841H12.9549ZM12.9549 12.9999V9.3999V12.9999ZM12.9549 12.9999V16.5999V12.9999Z" fill={fillColor}/>
<Path d="M16.5414 12.9999H12.9549M12.9549 12.9999H9.36841M12.9549 12.9999V9.3999M12.9549 12.9999V16.5999" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
</Svg>

  );
};
export default AttachMessageIcon;
