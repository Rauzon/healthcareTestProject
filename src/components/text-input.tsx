import React, {useState} from 'react';
import {
  TextInput as NativeTextInput,
  View,
  TextInputProps,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from '../shared/colors.ts';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

export const TextInput: React.FC<TextInputProps & {label: string}> = React.memo(
  ({label, ...props}) => {
    const [focused, setFocused] = useState<boolean>(false);

    const transitionStyle = useAnimatedStyle(() => ({
      top: withSpring(focused || !!props?.value ? -10 : 12),
      backgroundColor: focused || !!props?.value ? colors.white : 'transparent',
    }));

    return (
      <View style={styles.container}>
        <NativeTextInput
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          style={styles.textInput}
          {...props}
        />
        <Animated.View style={[styles.labelContainer, transitionStyle]}>
          <Text style={styles.labelText}>{label}</Text>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  textInput: {
    padding: 12,
  },
  labelContainer: {
    position: 'absolute',
    left: 12,
    zIndex: -1,
  },
  labelText: {
    color: colors.darkGray,
  },
});
