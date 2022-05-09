import {Dialog, Icon, Input} from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {addTransaction} from '../services/TransactionsService';
import {getCategories} from '../services/CategoriesService';
import uuid from 'react-native-uuid';

export const AddTransactionDialog = props => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState(null);
  const [category, setCategory] = React.useState();
  const [categories, setCategories] = React.useState([]);

  const handleConfirm = async () => {
    const form = {
      name: name,
      amount: amount,
      category: category,
      id: uuid.v4(),
    };
    const transactions = await addTransaction(form);

    props.setTransactions(transactions);
    props.toggleVisible();
  };

  React.useEffect(async () => {
    const categories = await getCategories();
    setCategories(categories);
    setCategory(categories[0]);
  }, [props.toggleVisible]);

  return (
    <Dialog
      isVisible={props.visible}
      onBackdropPress={() => props.toggleVisible()}
    >
      <Dialog.Title title="Add a new transaction" />
      <Input
        placeholder="Name"
        leftIcon={<Icon name="title" />}
        onChangeText={val => setName(val)}
      />

      <Input
        placeholder="Amount"
        leftIcon={<Icon name="attach-money" />}
        keyboardType="number-pad"
        onChangeText={val => setAmount(val)}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        {categories.map((category, index) => {
          return <Picker.Item key={index} label={category} value={category} />;
        })}
      </Picker>
      <Dialog.Actions>
        <Dialog.Button title="CONFIRM" onPress={() => handleConfirm()} />
        <Dialog.Button title="CANCEL" onPress={() => props.toggleVisible()} />
      </Dialog.Actions>
    </Dialog>
  );
};
