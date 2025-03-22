import React from 'react';
import Svg, { Path , Rect} from 'react-native-svg';

const SearchIcon = ({ width = 16, height = 16, strokeColor = "black", fillColor ='white'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 15" fill={fillColor} xmlns="http://www.w3.org/2000/svg">
    <Path d="M6.34667 3.62203C8.1922 3.62203 9.68833 5.12003 9.68833 6.96791L6.34667 3.62203ZM10.1286 10.752L13.03 13.6597L10.1286 10.752ZM11.6933 6.96791C11.6933 9.92453 9.29956 12.3213 6.34667 12.3213C3.39378 12.3213 1 9.92453 1 6.96791C1 4.0113 3.39378 1.6145 6.34667 1.6145C9.29956 1.6145 11.6933 4.0113 11.6933 6.96791Z" fill={fillColor}/>
        <Path d="M6.34667 3.62203C8.1922 3.62203 9.68833 5.12003 9.68833 6.96791M10.1286 10.752L13.03 13.6597M11.6933 6.96791C11.6933 9.92453 9.29956 12.3213 6.34667 12.3213C3.39378 12.3213 1 9.92453 1 6.96791C1 4.0113 3.39378 1.6145 6.34667 1.6145C9.29956 1.6145 11.6933 4.0113 11.6933 6.96791Z" stroke={strokeColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default SearchIcon;
