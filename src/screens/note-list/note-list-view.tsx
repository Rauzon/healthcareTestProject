import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../shared/colors.ts';
import {Divider} from '../../components/Divider.tsx';

type NoteListViewProps = {
  noteList?: string[];
};

export const NoteListView: React.FC<NoteListViewProps> = React.memo(
  ({noteList}) => {
    const renderItem = ({item}: ListRenderItemInfo<string>) => (
      <View style={styles.noteItem}>
        <Text>{item}</Text>
      </View>
    );

    const separator = () => <Divider style={styles.dividerStyle} />;

    return (
      <View style={styles.container}>
        <FlatList
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
          data={noteList}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  noteItem: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dividerStyle: {
    width: '100%',
    height: 1,
    backgroundColor: colors.darkGray,
  },
});
