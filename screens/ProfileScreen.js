import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from "@expo/vector-icons";

function ProfileScreen() {
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>J</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.tagline}>Web Developer & UI Designer</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.sectionContent}>
          I'm a passionate web developer with 5 years of experience creating
          responsive and user-friendly websites. I specialize in React, Node.js,
          and modern front-end technologies. I love collaborating with others
          and sharing my knowledge with the community.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>React</Text>
          </View>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>JavaScript</Text>
          </View>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>Node.js</Text>
          </View>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>UI Design</Text>
          </View>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>Responsive Design</Text>
          </View>
          <View style={styles.skillBadge}>
            <Text style={styles.skillText}>MongoDB</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactInfo}>Email: john.doe@example.com</Text>
        <Text style={styles.contactInfo}>Location: New York, USA</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primary500,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.primary500,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
  },
  section: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary500,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillBadge: {
    backgroundColor: Colors.primary100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  skillText: {
    color: Colors.primary800,
    fontWeight: "500",
  },
  contactInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: Colors.primary500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
