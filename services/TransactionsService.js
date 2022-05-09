import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTransactions = async () => {
  const strTransactions = await AsyncStorage.getItem('transactions');
  const transactions = JSON.parse(strTransactions);

  if (transactions) {
    return transactions;
  } else {
    return [];
  }
};

export const addTransaction = async item => {
  try {
    const transactions = await getTransactions();

    if (transactions) {
      const newTransactions = [...transactions, item];
      const newTransactionsStr = JSON.stringify([...transactions, item]);
      await AsyncStorage.setItem('transactions', newTransactionsStr);
      return newTransactions;
    } else {
      await AsyncStorage.setItem('transactions', JSON.stringify([item]));
      return [item];
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTransaction = async id => {
  try {
    const transactions = await getTransactions();
    const newTransactions = transactions.filter(
      transaction => transaction.id !== id,
    );

    const newTransactionsStr = JSON.stringify(newTransactions);
    console.log('transactions after delete:', newTransactionsStr);
    await AsyncStorage.setItem('transactions', newTransactionsStr);
    return newTransactions ? newTransactions : [];
  } catch (err) {
    console.log(err);
  }
};
