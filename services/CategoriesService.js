import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCategories = async () => {
  const strCategories = await AsyncStorage.getItem('categories');
  const categories = JSON.parse(strCategories);

  if (categories) {
    return categories;
  } else {
    return [];
  }
};

export const addCategory = async item => {
  const strCategory = await AsyncStorage.getItem('categories');
  const category = JSON.parse(strCategory);

  try {
    if (category) {
      const newCategory = JSON.stringify([...category, item]);
      await AsyncStorage.setItem('categories', newCategory);
      console.log('service:', newCategory);
    } else {
      await AsyncStorage.setItem('categories', JSON.stringify([item]));
    }
  } catch (err) {
    console.log(err);
  }
};
