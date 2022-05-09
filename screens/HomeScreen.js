import React from 'react';
import {Button, Card, ListItem, SpeedDial} from '@rneui/themed';
import {ScrollView, View} from 'react-native';
import {AddTransactionDialog} from '../components/AddTransactionDialog';
import {AddCategoryDialog} from '../components/AddCategoryDialog';
import {
  deleteTransaction,
  getTransactions,
} from '../services/TransactionsService';
import {useIsFocused} from '@react-navigation/native';

export const HomeScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [visibleCat, setVisibleCat] = React.useState(false);
  const [visibleTra, setVisibleTra] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const isFocused = useIsFocused();

  const toggleVisibleTra = () => {
    setVisibleTra(!visibleTra);
  };
  const toggleVisibleCat = () => {
    setVisibleCat(!visibleCat);
  };

  React.useEffect(async () => {
    //AsyncStorage.clear();
    const transactions = await getTransactions();
    setTransactions(transactions);
  }, []);

  const handleDeleteItem = async id => {
    const transactions = await deleteTransaction(id);
    setTransactions(transactions);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{width: '100%'}}>
        <Card>
          <Card.Title
            style={{
              textAlign: 'center',
              fontSize: 20,
              paddingVertical: 5,
            }}
          >
            Your Transactions
          </Card.Title>
          <Card.Divider />
          {transactions.map((item, i) => (
            <ListItem.Swipeable
              key={i}
              bottomDivider="true"
              rightContent={reset => (
                <Button
                  title="Delete"
                  onPress={() => handleDeleteItem(item.id)}
                  icon={{name: 'delete', color: 'white'}}
                  buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
                />
              )}
            >
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.amount}€</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem.Swipeable>
          ))}
        </Card>
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add Transaction"
          onPress={() => {
            toggleVisibleTra();
          }}
        ></SpeedDial.Action>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add Category"
          onPress={() => toggleVisibleCat()}
        />
      </SpeedDial>
      <AddTransactionDialog
        setTransactions={setTransactions}
        toggleVisible={toggleVisibleTra}
        visible={visibleTra}
      />
      <AddCategoryDialog
        toggleVisible={toggleVisibleCat}
        visible={visibleCat}
      />
    </View>
  );
};
