import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {getCategories} from '../services/CategoriesService';
import {getTransactions} from '../services/TransactionsService';
import {PieChartComponent} from '../components/PieChartComponent';
import {BarChartComponent} from '../components/BarChartComponent';
import {Card} from '@rneui/themed';
import {useIsFocused} from '@react-navigation/native';

export const StatsScreen = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [categoryColors, setCategoryColors] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(async () => {
    console.log('rendering StatsScreen');
    const transactions = await getTransactions();
    const categories = await getCategories();

    setTransactions(transactions);
    setCategories(categories);
    handleCategoryColors(categories);
  }, [isFocused]);

  const handleCategoryColors = categories => {
    const categoryColors = categories.map(category => {
      return {category: category, color: randomColor()};
    });
    setCategoryColors(categoryColors);
  };

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  return (
    <ScrollView>
      <Card>
        <Card.Title
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            paddingVertical: 5,
            backgroundColor: 'green',
            borderRadius: 8,
          }}
        >
          Transactions amount
        </Card.Title>

        <View
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {categories.length && categoryColors.length ? (
            <PieChartComponent
              transactions={transactions}
              categories={categories}
              categoryColors={categoryColors}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <Card.Title
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 20,
            color: 'black',
            paddingVertical: 5,
            backgroundColor: 'green',
            borderRadius: 8,
          }}
        >
          Money spent per category
        </Card.Title>
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {categories.length && categoryColors.length ? (
            <BarChartComponent
              transactions={transactions}
              categories={categories}
              categoryColors={categoryColors}
            />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </Card>
    </ScrollView>
  );
};
