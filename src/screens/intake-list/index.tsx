import React, {useCallback} from 'react';
import {IntakeListView} from './intake-list-view.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainRoutes, MainStackParamList} from '../../navigation/main.tsx';
import {useStore} from '../../store';
import {ChangeIntakeCountTypes} from '../../shared/types.ts';

const IntakeList = () => {
  const {navigate} =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, MainRoutes.AddIntake>
    >();

  const {intakeList, changeCount} = useStore(state => state);

  const onCardPress = useCallback(
    (id: string) => {
      navigate(MainRoutes.AddIntake, {id});
    },
    [navigate],
  );

  const onAddIntakePress = useCallback(() => {
    navigate(MainRoutes.AddIntake, {});
  }, [navigate]);

  const onChangeIntake = useCallback(
    (id: string, type: ChangeIntakeCountTypes) => {
      changeCount(id, type);
    },
    [changeCount],
  );

  return (
    <IntakeListView
      onCardPress={onCardPress}
      onChangeIntake={onChangeIntake}
      intakeList={intakeList}
      onAddIntakePress={onAddIntakePress}
    />
  );
};

export default IntakeList;
