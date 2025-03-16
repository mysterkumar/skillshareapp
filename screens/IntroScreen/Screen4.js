import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Screen4 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/images/screen4.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Embark On Your Education Journey</Text>
      <Text style={styles.subtitle}>
        Utilize Generative AI For Proper Idea Generations And Make Them Real
      </Text>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Screen5")}
      >
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  continueButton: {
    backgroundColor: "#4A6FF0",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Screen4;
