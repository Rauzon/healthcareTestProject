import React from 'react';
import {
  SafeAreaView as NativeSafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

type SafeAreaProps = {
  children: React.JSX.Element;
} & SafeAreaViewProps;

export const SafeAreaView: React.FC<SafeAreaProps> = React.memo(props => {
  return (
    <NativeSafeAreaView {...props} edges={props?.edges ?? ['top']}>
      {props?.children}
    </NativeSafeAreaView>
  );
});
