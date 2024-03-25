import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {AddIntakeView} from './add-intake.tsx';
import {useStore} from '../../store';
import {MainRoutes, MainStackParamList} from '../../navigation/main.tsx';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MainStackParamList, MainRoutes.IntakeList>,
  NativeStackNavigationProp<MainStackParamList, MainRoutes.NoteList>
>;

const AddIntake = () => {
  const {
    params: {id},
  } = useRoute<RouteProp<MainStackParamList, MainRoutes.AddIntake>>();
  const {navigate, setOptions} = useNavigation<NavigationProp>();
  const {
    addIntake,
    updateIntake,
    removeIntakeById,
    addNoteById,
    intakeList,
    notes,
  } = useStore(state => state);

  const [inputFields, setInputFields] = useState({
    name: '',
    description: '',
    initialCount: '',
    destinationCount: '',
  });

  useEffect(() => {
    setOptions({
      headerTitle: id ? 'Edit Intake' : 'Add Intake',
    });
  }, [setOptions, id]);

  const inputHandlers = useMemo(
    () => ({
      setName: (value: string) =>
        setInputFields(prev => ({...prev, name: value})),
      setDescription: (value: string) =>
        setInputFields(prev => ({...prev, description: value})),
      setInitialCount: (value: string) =>
        setInputFields(prev => ({...prev, initialCount: value})),
      setDestinationCount: (value: string) =>
        setInputFields(prev => ({...prev, destinationCount: value})),
    }),
    [],
  );

  const isNotesExist = useMemo(() => {
    return id && !!notes[id];
  }, [id, notes]);

  useEffect(() => {
    if (id) {
      const selectedIntake = intakeList?.find(intake => intake?.id === id);

      inputHandlers?.setName(selectedIntake?.name || '');
      inputHandlers?.setDescription(selectedIntake?.description || '');
      inputHandlers?.setInitialCount(selectedIntake?.initialCount || '');
      inputHandlers?.setDestinationCount(
        selectedIntake?.destinationCount || '',
      );
    }
  }, [id, intakeList, inputHandlers]);

  const onFormSubmitPress = useCallback(() => {
    if (id) {
      const selectedIntake = intakeList?.find(intake => intake?.id === id);

      selectedIntake &&
        updateIntake({
          ...selectedIntake,
          ...inputFields,
        });
    } else {
      addIntake({
        fulfilled: false,
        id: new Date().getTime().toString(),
        ...inputFields,
      });
    }
    navigate(MainRoutes.IntakeList);
  }, [id, navigate, intakeList, updateIntake, addIntake, inputFields]);

  const onRemoveIntakePress = useCallback(() => {
    if (id) {
      removeIntakeById(id);
      navigate(MainRoutes.IntakeList);
    }
  }, [id, removeIntakeById, navigate]);

  const onAddNote = useCallback(
    (note: string) => {
      if (id) {
        addNoteById(id, note);
      }
    },
    [addNoteById, id],
  );

  const onNotesThreadPress = useCallback(() => {
    navigate(MainRoutes.NoteList, {id});
  }, [navigate, id]);

  return (
    <AddIntakeView
      isNotesExist={!!isNotesExist}
      isEditMode={!!id}
      inputFields={inputFields}
      onAddNote={onAddNote}
      inputHandlers={inputHandlers}
      onFormSubmitPress={onFormSubmitPress}
      onRemoveIntakePress={onRemoveIntakePress}
      onNotesThreadPress={onNotesThreadPress}
    />
  );
};

export default AddIntake;
