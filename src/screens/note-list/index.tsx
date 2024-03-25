import React, {useMemo} from 'react';
import {NoteListView} from './note-list-view.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainRoutes, MainStackParamList} from '../../navigation/main.tsx';
import {useStore} from '../../store';

const NoteList = () => {
  const notes = useStore(state => state.notes);

  const {
    params: {id},
  } = useRoute<RouteProp<MainStackParamList, MainRoutes.NoteList>>();

  const noteList = useMemo(() => {
    return id ? notes[id] : [];
  }, [notes, id]);

  return <NoteListView noteList={noteList} />;
};

export default NoteList;
