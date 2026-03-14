import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
}

const FacebookIcon: React.FC<IconProps> = ({ width = 56, height = 56 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512">
      <G>
        <Path
          fill="#1877F2"
          d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
        />
        <Path
          fill="#ffffff"
          d="M343.19 322.12l9.92-64.77h-62.12V215.35c0-17.74 8.7-35 36.51-35h28.25v-55.13s-25.64-4.38-50.15-4.38c-51.16 0-84.61 31.03-84.61 87.16v49.34h-56.89v64.77H221v156.54a225.06 225.06 0 0035 2.76 226.75 226.75 0 0035-2.76V322.12h52.19z"
        />
      </G>
    </Svg>
  );
};

export default FacebookIcon;
