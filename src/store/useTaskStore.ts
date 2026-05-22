import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TaskItem } from '../utils/handle-api';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

interface TaskState {
  tasks: TaskItem[];
  loading: boolean;
  filter: 'all' | 'completed' | 'pending';
  editingTask: TaskItem | null;

  fetchTasks: () => Promise<void>;
  addTask: (text: string, completed: boolean, dueDate: string | null) => Promise<void>;
  updateTask: (id: string, text: string, completed: boolean, dueDate: string | null) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteAllTasks: () => void;
  setFilter: (filter: 'all' | 'completed' | 'pending') => void;
  setEditingTask: (task: TaskItem | null) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      loading: false,
      filter: 'all',
      editingTask: null,

      fetchTasks: async () => {
        set({ loading: true });
        try {
          const { data } = await axios.get<TaskItem[]>(`${baseURL}`);
          set({ tasks: data, loading: false });
        } catch (err) {
          console.log(err);
          set({ loading: false });
        }
      },

      addTask: async (text, completed, dueDate) => {
        try {
          await axios.post(`${baseURL}/save`, { text, completed, dueDate });
          await get().fetchTasks();
        } catch (err) {
          console.log(err);
        }
      },

      updateTask: async (id, text, completed, dueDate) => {
        try {
          await axios.post(`${baseURL}/update`, { _id: id, text, completed, dueDate });
          await get().fetchTasks();
        } catch (err) {
          console.log(err);
        }
      },

      deleteTask: async (id) => {
        try {
          await axios.post(`${baseURL}/delete`, { _id: id });
          await get().fetchTasks();
        } catch (err) {
          console.log(err);
        }
      },

      deleteAllTasks: () => set({ tasks: [] }),

      setFilter: (filter) => set({ filter }),

      setEditingTask: (task) => set({ editingTask: task }),
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks, filter: state.filter }),
    }
  )
);
