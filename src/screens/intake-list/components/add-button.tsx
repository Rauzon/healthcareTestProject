import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../shared/colors.ts';
import {defaultHitSlop} from '../../../shared/common.ts';

type AddButtonProps = {
  onAddIntakePress(): void;
};

export const AddButton: React.FC<AddButtonProps> = React.memo(
  ({onAddIntakePress}) => {
    return (
      <TouchableOpacity
        onPress={onAddIntakePress}
        hitSlop={defaultHitSlop}
        activeOpacity={1}
        style={styles.container}>
        <View style={styles.line} />
        <View style={[styles.transformedLine, styles.line]} />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    width: 50,
    height: 50,
    padding: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  transformedLine: {
    position: 'absolute',
    transform: [{rotate: '90deg'}],
  },
});
