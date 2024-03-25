import React from 'react';
import {DimensionValue, View, ViewStyle} from 'react-native';

type DividerProps = {
  height?: DimensionValue;
  width?: DimensionValue;
  style?: ViewStyle | ViewStyle[];
};

export const Divider: React.FC<DividerProps> = React.memo(
  ({height = 6, width = '100%', style}) => {
    return <View style={[{width, height}, style]} />;
  },
);
