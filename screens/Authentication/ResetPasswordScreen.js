import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import Input from "../../components/Auth/Input";
import Button from "../../components/ui/Button";
import { Colors } from "../../constants/styles";
import axios from "axios";

function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  // Use the same API key as in util/auth.js
  const API_KEY = "AIzaSyAf6eMV9YBF552FYmRd1m10sZeNCNkhs3E";

  async function resetPasswordHandler() {
    try {
      // Using Firebase REST API
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      );

      Alert.alert(
        "Success",
        "Password reset email sent. Please check your inbox.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      let message =
        "Failed to send reset email. Please check your email address.";
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
          message = "No account found with this email address.";
        }
      }
      Alert.alert("Error", message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContent}>
        <Text style={styles.title}>Reset Password</Text>
        <Input
          label="Email Address"
          onUpdateValue={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.buttons}>
          <Button onPress={resetPasswordHandler}>Send Reset Link</Button>
        </View>
      </View>
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    padding: 20,
  },
  authContent: {
    marginTop: 32,
    marginHorizontal: 0,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
});
