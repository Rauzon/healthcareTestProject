import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from '../../components';
import {AddButton} from './components/add-button.tsx';
import {colors} from '../../shared/colors.ts';
import {IntakeCard} from './components/intake-card.tsx';
import {Divider} from '../../components/Divider.tsx';
import {ChangeIntakeCountTypes} from '../../shared/types.ts';
import {Intake} from '../../store/types.ts';

type IntakeListViewProps = {
  onAddIntakePress(): void;
  intakeList: Intake[];
  onCardPress(id: string): void;
  onChangeIntake(id: string, type: ChangeIntakeCountTypes): void;
};

export const IntakeListView: React.FC<IntakeListViewProps> = ({
  onAddIntakePress,
  intakeList,
  onChangeIntake,
  onCardPress,
}) => {
  const renderItem = ({item}: ListRenderItemInfo<Intake>) => {
    return (
      <IntakeCard
        onChangeIntake={onChangeIntake}
        onCardPress={onCardPress}
        {...item}
      />
    );
  };

  const separator = () => <Divider />;

  const emptyList = () => {
    return (
      <View>
        <Text style={styles.emptyListText}>Intake list is empty</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          contentContainerStyle={!intakeList?.length ? styles.emptyList : {}}
          showsVerticalScrollIndicator={false}
          data={intakeList}
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
          ListEmptyComponent={emptyList}
          keyExtractor={({id}) => id}
        />
        <View style={styles.buttonContainer}>
          <AddButton onAddIntakePress={onAddIntakePress} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 16,
  },
  emptyListText: {
    color: colors.darkGray,
    textAlign: 'center',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
});
