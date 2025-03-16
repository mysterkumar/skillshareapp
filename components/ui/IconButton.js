import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, color, size, onPress }) {
  return (
    <TouchableOpacity
      style={styles.outerContainer}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.button}>
        <Ionicons name={icon} color={color} size={size || 30} />
      </View>
    </TouchableOpacity>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 20,
    margin: 8,
  },
  button: {
    padding: 12,
  },
});
