import AsyncStorage from '@react-native-community/async-storage';

export const getDataByKey = async <T>(key: string) => {
  const data = await AsyncStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
};

export const setDataByKey = async <T>(key: string, data: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));

  return true;
};

export const deleteDataByKey = async (key: string) => {
  await AsyncStorage.removeItem(key);

  return true;
};
