import { View, Text, StyleSheet } from "react-native";

function MessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subtitle}>Coming soon!</Text>
      <Text style={styles.description}>
        This feature is currently under development. Stay tuned for updates!
      </Text>
    </View>
  );
}

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#666",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
});
