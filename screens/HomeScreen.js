import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

function HomeScreen() {
  const [friends, setFriends] = useState([
    { id: "1", name: "John Smith", skill: "Web Development" },
    { id: "2", name: "Emma Wilson", skill: "Graphic Design" },
    { id: "3", name: "Michael Brown", skill: "Photography" },
    { id: "4", name: "Sarah Davis", skill: "Digital Marketing" },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends List</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.friendSkill}>Skill: {item.skill}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  friendItem: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  friendSkill: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
});
