import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddSudoku from './screens/addSudoku';
import Home from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Play from './screens/play';
import StartSudoku from './screens/startSudoku.js';
import PlaySudoku from './screens/playSudoku.js';
import SudokuList from './screens/sudokuList.js';
import {useTranslation} from 'react-i18next'; 
import './i18n/i18n'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import CustomButton from './components/button.js';


const Stack = createNativeStackNavigator();

export default function App() {

  const {t, i18n} = useTranslation(); 


  const changeLanguage = async () => {
    let lng = "en" 
    if (i18n.language == "en") lng = "no";

    i18n.changeLanguage(lng);

   // await AsyncStorage.setItem("lng", lng);
    //console.log("Language saved as " + lng);


  }
 
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      <Stack.Navigator>
        <Stack.Screen name={t('Home')} component={Home} 
          options={{
            animation: 'none',
            headerRight: () => (
              <TouchableOpacity style={styles.box} onPress={changeLanguage}>
                <Text style={styles.flag}> {t("flag")} </Text>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen name='Play' component={Play} />
        <Stack.Screen name='StartSudoku' component={StartSudoku} />
        <Stack.Screen name='PlaySudoku' component={PlaySudoku} />
        <Stack.Screen name='AddSudoku' component={AddSudoku} />
        <Stack.Screen name='SudokuList' component={SudokuList} 
          options={({ navigation }) => ({
            headerRight: () => (
              <CustomButton title={t("Add new sudoku")} onPress={() => navigation.navigate('AddSudoku')} />
            )
          })}
        />
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
  flag: {
    fontSize: 30
  },
  box: {
    borderRadius: 15,
    borderColor: '#555',
    borderWidth: 2,
    paddingBottom: 3
  }
});
