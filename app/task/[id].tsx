import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTaskStore } from '../../src/store/useTaskStore';
import { globalStyles } from '../../src/styles/global';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const task = useTaskStore((state) => state.tasks.find((t) => t._id === id));
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  if (!task) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.notFound}>Tarefa não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));

  const handleEdit = () => {
    setEditingTask(task);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.taskTitle}>{task.text}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <View style={[styles.badge, task.completed ? styles.badgeCompleted : styles.badgePending]}>
              <Text style={styles.badgeText}>{task.completed ? 'Concluída' : 'Pendente'}</Text>
            </View>
          </View>

          {task.dueDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Data limite</Text>
              <Text style={[styles.dateValue, isOverdue ? styles.overdue : styles.onTime]}>
                {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                {isOverdue && !task.completed ? '  (Atrasada)' : ''}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  notFound: {
    textAlign: 'center',
    color: '#666',
    fontSize: globalStyles.bodyFontSize,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  label: {
    fontSize: globalStyles.bodyFontSize,
    color: '#555',
    fontWeight: 'bold',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeCompleted: {
    backgroundColor: '#e8f5e9',
  },
  badgePending: {
    backgroundColor: '#fff3e0',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateValue: {
    fontSize: globalStyles.bodyFontSize,
  },
  overdue: {
    color: '#e53935',
    fontWeight: 'bold',
  },
  onTime: {
    color: '#43a047',
  },
  editButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
