import { useContext, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../util/auth";

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);

      // Keep the success navigation from your current implementation
      navigation.navigate("Success");
      setTimeout(() => {
        authCtx.authenticate(token);
      }, 2000);
    } catch (error) {
      // The error message is already formatted in the util/auth.js file
      // so we can use it directly here
      Alert.alert("Authentication failed", error.message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <AuthContent onAuthenticate={signupHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

export default SignupScreen;
