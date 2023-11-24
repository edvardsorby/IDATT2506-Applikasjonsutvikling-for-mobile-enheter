import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddSudoku from './screens/addSudoku';
import Home from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Play from './screens/play';
import StartSudoku from './screens/startSudoku.js';
import PlaySudoku from './screens/playSudoku.js';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Play' component={Play} />
        <Stack.Screen name='StartSudoku' component={StartSudoku} />
        <Stack.Screen name='PlaySudoku' component={PlaySudoku} />
        <Stack.Screen name='AddSudoku' component={AddSudoku} />
      </Stack.Navigator>
      {/* <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
