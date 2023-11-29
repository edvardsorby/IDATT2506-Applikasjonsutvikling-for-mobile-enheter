import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedEasy: {
    backgroundColor: '#a3ff87',
    borderRadius: 17,
    height: '100%'
  },
  selectedMedium: {
    backgroundColor: '#f9ff87',
    borderRadius: 17,
    height: '100%'
  },
  selectedHard: {
    backgroundColor: '#ff8787',
    borderRadius: 17,
    height: '100%',
  },
  radioButtonText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  radioButtonGroup: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  radioButton: {
    width: 75,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 3,
    marginTop: 20,
    marginRight: 10
  },
  greyedOut: {
    backgroundColor: '#e9e9e9'
  },
  greyedOutText: {
    color: '#000'
  },
  green: {
    backgroundColor: '#a3ff87',
  },
  yellow: {
    backgroundColor: '#f9ff87',
  },
  red: {
    backgroundColor: '#ff8787',
  },
});