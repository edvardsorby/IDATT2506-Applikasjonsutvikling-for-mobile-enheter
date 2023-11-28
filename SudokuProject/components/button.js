import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    width: 200,
    margin: 5
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 16,
    textAlign: 'center',
  }
})