import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Intake} from './types.ts';
import {ChangeIntakeCountTypes} from '../shared/types.ts';

interface initialState {
  intakeList: Intake[];
  notes: Record<string, string[]>;
  addIntake(newIntake: Intake): void;
  updateIntake(updatedIntake: Intake): void;
  changeCount(id: string, type: ChangeIntakeCountTypes): void;
  removeIntakeById(id: string): void;
  addNoteById(id: string, newNote: string): void;
}

export const useStore = create(
  persist<initialState>(
    set => ({
      intakeList: [],
      notes: {},
      addIntake: (newIntake: Intake) =>
        set(state => ({intakeList: [newIntake, ...state.intakeList]})),
      updateIntake: (updatedIntake: Intake) =>
        set(state => {
          const list = state?.intakeList?.filter(
            item => item?.id !== updatedIntake?.id,
          );

          return {intakeList: [updatedIntake, ...list]};
        }),
      changeCount: (id: string, type: ChangeIntakeCountTypes) =>
        set(state => {
          const preparedList = state?.intakeList?.map(intake => {
            if (intake?.id === id) {
              const result =
                type === 'increase'
                  ? Number(intake?.initialCount) + 1
                  : Number(intake?.initialCount) - 1;
              return {
                ...intake,
                fulfilled: Number(intake?.destinationCount) === result,
                initialCount: result?.toString(),
              };
            }

            return intake;
          });

          const selectedIntake = preparedList?.find(intake => intake.id === id);

          if (selectedIntake?.fulfilled) {
            const filteredIntakes = preparedList?.filter(
              intake => intake?.id !== id,
            );

            return {intakeList: [...filteredIntakes, selectedIntake]};
          } else {
            return {intakeList: preparedList};
          }
        }),
      removeIntakeById: (id: string) =>
        set(state => ({
          intakeList: state?.intakeList?.filter(intake => intake.id !== id),
        })),
      addNoteById: (id: string, newNote: string) =>
        set(state => {
          const notesData = state?.notes[id];

          if (notesData) {
            return {notes: {...state.notes, [id]: [newNote, ...notesData]}};
          } else {
            return {notes: {...state.notes, [id]: [newNote]}};
          }
        }),
    }),
    {name: 'intake-storage', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
