import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View, Text } from 'react-native';
import TaskItem from './TaskItem';
import { useTaskStore } from '../store/useTaskStore';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);

  const sections = useMemo(() => {
    const filtered = filter === 'completed'
      ? tasks.filter((t) => t.completed)
      : filter === 'pending'
        ? tasks.filter((t) => !t.completed)
        : tasks;

    return [
      { title: '✅ Concluídas', data: filtered.filter((t) => t.completed) },
      { title: '📋 Pendentes', data: filtered.filter((t) => !t.completed) },
    ];
  }, [tasks, filter]);

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => <TaskItem task={item} />}
        renderSectionFooter={({ section }) =>
          section.data.length === 0 ? (
            <Text style={styles.emptySectionText}>Nenhuma tarefa nesta categoria.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    padding: 12,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  emptySectionText: {
    padding: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default TaskList;
