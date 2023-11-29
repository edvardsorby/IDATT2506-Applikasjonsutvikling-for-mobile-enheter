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
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#00796B',
    width: 200,
    margin: 5,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 18,
    textAlign: 'center',
  }
})