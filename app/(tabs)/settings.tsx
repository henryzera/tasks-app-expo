import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useTaskStore } from '../../src/store/useTaskStore';
import { globalStyles } from '../../src/styles/global';

export default function SettingsScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total de tarefas</Text>
            <Text style={styles.statValue}>{tasks.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Concluídas</Text>
            <Text style={[styles.statValue, styles.completed]}>{completedCount}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Pendentes</Text>
            <Text style={[styles.statValue, styles.pending]}>{pendingCount}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ações</Text>
          <TouchableOpacity style={styles.syncButton} onPress={fetchTasks}>
            <Text style={styles.syncButtonText}>Sincronizar com o Servidor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={deleteAllTasks}>
            <Text style={styles.clearButtonText}>Limpar Todas as Tarefas</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statLabel: {
    fontSize: globalStyles.bodyFontSize,
    color: '#555',
  },
  statValue: {
    fontSize: globalStyles.bodyFontSize,
    fontWeight: 'bold',
  },
  completed: {
    color: '#4caf50',
  },
  pending: {
    color: '#ff9800',
  },
  syncButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  syncButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4d4d',
  },
  clearButtonText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
