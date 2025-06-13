import { Text, View, StyleSheet, Image } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à Prova Prática</Text>
      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/125830775?v=4' }}
        style={styles.image}
      />
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
    fontSize: 24, // Increased for better visibility
    marginBottom: 20, // Space between text and image
  },
  image: {
    width: 150, // Adjust size as needed
    height: 150,
    borderRadius: 75, // Makes the image circular (optional, since it’s a GitHub avatar)
  },
});