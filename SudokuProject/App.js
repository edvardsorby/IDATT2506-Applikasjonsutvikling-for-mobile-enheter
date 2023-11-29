import AddSudoku from './screens/addSudoku';
import Home from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartSudoku from './screens/startSudoku.js';
import PlaySudoku from './screens/playSudoku.js';
import SudokuList from './screens/sudokuList.js';
import {useTranslation} from 'react-i18next'; 
import './i18n/i18n'; 
import CustomButton from './components/button.js';
import LangButton from './components/langButton.js';


const Stack = createNativeStackNavigator();

export default function App() {

  const {t, i18n} = useTranslation(); 


  return (
    <NavigationContainer>
      <Stack.Navigator
         screenOptions={{
          headerTitle: ''
        }}
      >
        <Stack.Screen name={t('Home')} component={Home} 
          options={{
            animation: 'none',
            headerRight: () => (
            <LangButton />
            )
          }}
        />
        <Stack.Screen name='StartSudoku' component={StartSudoku} />
        <Stack.Screen name='PlaySudoku' component={PlaySudoku} 
          options={{
            headerTitle: t("Playing Sudoku"),
          }}
        />
        <Stack.Screen name='AddSudoku' component={AddSudoku} />
        <Stack.Screen name='SudokuList' component={SudokuList} 
          options={({ navigation }) => ({
            headerRight: () => (
              <CustomButton title={t("Add new")} onPress={() => navigation.navigate('AddSudoku')} />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}