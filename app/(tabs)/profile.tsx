import { Text, View, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nome: Gustavo C. S. Sousa</Text>
      <Text style={styles.text}>Curso: Análise e Desenvolvimento de Sistemas</Text>
      <Text style={styles.text}>Disciplina: Desenvolvimento Mobile</Text>
      <Text style={styles.text}>Data: {formattedDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
});