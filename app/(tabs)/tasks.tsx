import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedTasks, setSavedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadSavedTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem('savedTasks');
        if (saved) {
          setSavedTasks(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved tasks:', error);
      }
    };
    loadSavedTasks();
  }, []);

  useEffect(() => {
    axios
      .get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  const handleTaskPress = async (task: Task) => {
    try {
      const updatedSavedTasks = [...savedTasks, task];
      setSavedTasks(updatedSavedTasks);
      await AsyncStorage.setItem('savedTasks', JSON.stringify(updatedSavedTasks));
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => handleTaskPress(item)}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskStatus}>
        Status: {item.completed ? 'Completed' : 'Pending'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tasks</Text>
        <ActivityIndicator size="large" color="#ffd33d" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <Text style={styles.savedCount}>Saved Tasks: {savedTasks.length}</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    paddingTop: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  savedCount: {
    color: '#ffd33d',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
  },
  taskStatus: {
    color: '#ffd33d',
    fontSize: 14,
    marginTop: 5,
  },
});