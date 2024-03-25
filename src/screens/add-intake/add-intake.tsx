import React, {useMemo, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from '../../components';
import {colors} from '../../shared/colors.ts';
import {TextInput} from '../../components/text-input.tsx';
import {Divider} from '../../components/Divider.tsx';
import {isInteger} from '../../utils/isInteger.ts';

type AddIntakeProps = {
  isNotesExist: boolean;
  isEditMode?: boolean;
  inputFields: {
    name: string;
    description: string;
    initialCount: string;
    destinationCount: string;
  };
  inputHandlers: {[key: string]: (value: string) => void};
  onFormSubmitPress(): void;
  onRemoveIntakePress(): void;
  onAddNote(note: string): void;
  onNotesThreadPress(): void;
};

export const AddIntakeView: React.FC<AddIntakeProps> = ({
  inputFields,
  inputHandlers,
  onFormSubmitPress,
  isEditMode,
  onRemoveIntakePress,
  onAddNote,
  isNotesExist,
  onNotesThreadPress,
}) => {
  const [note, setNote] = useState('');

  const disabled = useMemo(() => {
    return (
      !isInteger(inputFields?.initialCount) ||
      !isInteger(inputFields?.destinationCount) ||
      !inputFields?.name ||
      !inputFields?.initialCount ||
      !inputFields?.destinationCount ||
      Number(inputFields?.initialCount) >= Number(inputFields?.destinationCount)
    );
  }, [inputFields]);

  const onAddNotePress = () => {
    onAddNote(note?.trim());
    setNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          label="Name"
          value={inputFields.name}
          onChangeText={inputHandlers.setName}
        />
        <Divider height={16} />
        <TextInput
          label="Description"
          value={inputFields.description}
          onChangeText={inputHandlers.setDescription}
        />
        <Divider height={16} />
        <TextInput
          label="Initial count"
          value={inputFields.initialCount}
          onChangeText={inputHandlers.setInitialCount}
          keyboardType="numeric"
        />
        <Divider height={16} />
        <TextInput
          label="Destination count"
          value={inputFields.destinationCount}
          onChangeText={inputHandlers.setDestinationCount}
          keyboardType="numeric"
        />
        <Divider height={16} />
        {isEditMode && (
          <>
            <TextInput
              multiline
              label="Notes"
              value={note}
              onChangeText={setNote}
            />
            {isNotesExist && (
              <>
                <Divider height={12} />
                <View style={styles.threadBtnContainer}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onNotesThreadPress}>
                    <Text style={styles.threadText}>Notes thread</Text>
                  </TouchableOpacity>
                  <View />
                </View>
              </>
            )}
            <Divider height={16} />
            <Pressable
              disabled={!note?.trim()}
              onPress={onAddNotePress}
              style={[
                styles.saveBtnContainer,
                !note?.trim() && styles.disabled,
              ]}>
              <Text
                style={[styles.btnText, !note?.trim() && styles.disabledText]}>
                + Add note
              </Text>
            </Pressable>
            <Divider height={12} />
          </>
        )}
        <Pressable
          disabled={disabled}
          onPress={onFormSubmitPress}
          style={[styles.saveBtnContainer, disabled && styles.disabled]}>
          <Text style={[styles.btnText, disabled && styles.disabledText]}>
            Save
          </Text>
        </Pressable>
        <Divider height={12} />
        {isEditMode && (
          <Pressable
            disabled={disabled}
            onPress={onRemoveIntakePress}
            style={styles.removeBtnContainer}>
            <Text style={styles.btnText}>Remove</Text>
          </Pressable>
        )}
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
    paddingHorizontal: 16,
  },
  saveBtnContainer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    color: colors.white,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
  disabledText: {
    color: colors.darkGray,
  },
  removeBtnContainer: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  threadBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  threadText: {
    color: colors.blue,
  },
});
