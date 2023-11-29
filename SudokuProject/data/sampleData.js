import AsyncStorage from "@react-native-async-storage/async-storage";

const FIRST_RUN_KEY = 'firstRun';

const isFirstRun = async () => {
  try {
    const value = await AsyncStorage.getItem(FIRST_RUN_KEY);
    return value === null;
  } catch (error) {
    console.error('Error checking first run:', error);
    return false;
  }
};

const setFirstRunFlag = async () => {
  try {
    await AsyncStorage.setItem(FIRST_RUN_KEY, 'false');
  } catch (error) {
    console.error('Error setting first run flag:', error);
  }
};

export const initializeData = async () => {

  if (await isFirstRun()) {
    
    const easyGrid = {"difficulty": "Easy",
     "solution": [[4, 1, 5, 6, 9, 2, 3, 7, 8], [7, 3, 2, 8, 4, 1, 9, 5, 6], [8, 9, 6, 3, 5, 7, 4, 2, 1], [5, 7, 9, 1, 6, 4, 8, 3, 2], [1, 4, 8, 2, 7, 3, 5, 6, 9], [2, 6, 3, 9, 8, 5, 1, 4, 7], [3, 8, 1, 4, 2, 6, 7, 9, 5], [6, 5, 4, 7, 1, 9, 2, 8, 3], [9, 2, 7, 5, 3, 8, 6, 1, 4]],
     "value": [[0, 0, 5, 6, 9, 2, 0, 0, 8], [7, 3, 0, 0, 0, 0, 9, 0, 0], [8, 9, 6, 0, 5, 0, 0, 0, 1], [0, 0, 9, 0, 6, 4, 8, 0, 2], [1, 4, 8, 0, 0, 0, 0, 6, 9], [0, 6, 3, 9, 0, 0, 1, 4, 0], [3, 8, 0, 0, 2, 6, 7, 0, 5], [6, 0, 0, 0, 1, 0, 2, 0, 3], [0, 0, 0, 0, 3, 0, 6, 0, 0]]
    }
    const easyGrids = [easyGrid];
    const jsonValue1 = JSON.stringify(easyGrids);
    await AsyncStorage.setItem('easy-grids', jsonValue1);
 
    const mediumGrid = {
      "difficulty": "Medium",
      "solution": [[9, 7, 8, 4, 3, 6, 1, 5, 2], [4, 3, 2, 1, 5, 9, 7, 6, 8], [1, 6, 5, 2, 8, 7, 3, 4, 9], [2, 1, 9, 7, 6, 4, 5, 8, 3], [5, 4, 6, 8, 9, 3, 2, 1, 7], [7, 8, 3, 5, 1, 2, 6, 9, 4], [3, 5, 1, 9, 2, 8, 4, 7, 6], [8, 2, 4, 6, 7, 1, 9, 3, 5], [6, 9, 7, 3, 4, 5, 8, 2, 1]],
      "value": [[9, 0, 8, 4, 3, 0, 0, 0, 0], [4, 0, 0, 0, 0, 0, 0, 6, 0], [0, 6, 0, 0, 0, 7, 0, 0, 9], [0, 1, 0, 0, 6, 0, 0, 0, 3], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 5, 0, 0, 6, 9, 0], [3, 5, 0, 9, 0, 0, 4, 0, 6], [8, 2, 0, 0, 0, 0, 9, 0, 0], [6, 0, 0, 0, 0, 0, 0, 0, 1]]
    }
    const mediumGrids = [mediumGrid];
    const jsonValue2 = JSON.stringify(mediumGrids);
    await AsyncStorage.setItem('medium-grids', jsonValue2);
    
    const hardGrid = {
      "difficulty": "Hard",
      "solution": [[4, 7, 6, 2, 5, 3, 9, 1, 8], [1, 2, 8, 4, 7, 9, 3, 5, 6], [5, 3, 9, 8, 1, 6, 4, 7, 2], [6, 9, 4, 5, 2, 1, 7, 8, 3], [2, 5, 1, 7, 3, 8, 6, 9, 4], [3, 8, 7, 9, 6, 4, 1, 2, 5], [7, 1, 2, 3, 4, 5, 8, 6, 9], [8, 6, 3, 1, 9, 2, 5, 4, 7], [9, 4, 5, 6, 8, 7, 2, 3, 1]],
      "value": [[0, 0, 0, 0, 0, 0, 0, 0, 8], [0, 0, 8, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0], [6, 0, 0, 0, 0, 0, 7, 0, 3], [0, 0, 0, 0, 0, 0, 6, 9, 0], [0, 0, 0, 9, 0, 4, 0, 0, 5], [0, 0, 2, 0, 4, 0, 0, 0, 0], [0, 0, 3, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 2, 0, 0]]
    }
    const hardGrids = [hardGrid];
    const jsonValue3 = JSON.stringify(hardGrids);
    await AsyncStorage.setItem('hard-grids', jsonValue3);
    

    await setFirstRunFlag();
  }
};
