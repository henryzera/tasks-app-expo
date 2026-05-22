import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#000', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Minhas Tarefas',
          tabBarIcon: ({ color }) => <AntDesign name="check-square" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
