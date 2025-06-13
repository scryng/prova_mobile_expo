import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get<Task[]>('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskStatus}>
        Status: {item.completed ? 'Completed' : 'Pending'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
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