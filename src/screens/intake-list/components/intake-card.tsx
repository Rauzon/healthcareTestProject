import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../../../shared/colors.ts';
import {ChangeIntakeCountTypes} from '../../../shared/types.ts';
import {Intake} from '../../../store/types.ts';
import {defaultHitSlop} from '../../../shared/common.ts';

type IntakeCardProps = {
  onChangeIntake(id: string, type: ChangeIntakeCountTypes): void;
  onCardPress(id: string): void;
} & Intake;
export const IntakeCard: React.FC<IntakeCardProps> = React.memo(
  ({
    name,
    description,
    initialCount,
    id,
    fulfilled,
    onChangeIntake,
    onCardPress,
  }) => {
    const onChange = (type: ChangeIntakeCountTypes) => () => {
      if (Number(initialCount) === 1 && type === 'decrease') {
        return;
      }

      onChangeIntake(id, type);
    };

    const onPress = () => {
      onCardPress(id);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={styles.container}>
        <View style={styles.infoContainer}>
          <View>
            <Text>Name: {name}</Text>
          </View>
          {!!description && (
            <View>
              <Text>Description: {description}</Text>
            </View>
          )}
        </View>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            // disabled={}
            activeOpacity={0.9}
            hitSlop={defaultHitSlop}
            style={styles.btnWrapper}
            onPress={onChange('decrease')}>
            <View style={styles.line} />
          </TouchableOpacity>
          <View style={styles.countContentWrapper}>
            <Text>{initialCount}</Text>
          </View>
          {!fulfilled ? (
            <TouchableOpacity
              activeOpacity={0.9}
              hitSlop={defaultHitSlop}
              style={styles.btnWrapper}
              onPress={onChange('increase')}>
              <View style={styles.line} />
              <View style={[styles.line, styles.transformedLine]} />
            </TouchableOpacity>
          ) : (
            <View style={styles.empty}>
              <></>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  btnWrapper: {
    width: 20,
    height: 20,
    padding: 3,
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContentWrapper: {
    width: 30,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 10,
    height: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  transformedLine: {
    backgroundColor: colors.white,
    transform: [{rotate: '90deg'}],
    position: 'absolute',
  },
  empty: {width: 20, height: 20},
});
