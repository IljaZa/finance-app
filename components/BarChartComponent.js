import React from 'react';
import {View} from 'react-native';
import {BarChart, Grid} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';

export const BarChartComponent = ({
  transactions,
  categories,
  categoryColors,
}) => {
  const [spentPerCategory, setSpentPerCategory] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    console.log('rendering BarChart Component');
    calcSpentPerCategory(transactions, categories);
  }, [isFocused, transactions, categories]);

  const calcSpentPerCategory = (transactions, categories) => {
    const spentPerCategory = categories.map(category => {
      let spent = 0;
      let cat = category;
      transactions.forEach(transaction => {
        if (transaction.category === category) {
          spent = spent + +transaction.amount;
        }
      });
      return {
        category: cat,
        spent: spent,
      };
    });
    setSpentPerCategory(spentPerCategory);
  };

  const barData = spentPerCategory.map((item, i) => {
    const index = categoryColors.findIndex(
      obj => obj.category === item.category,
    );
    const color = categoryColors[index].color;
    return {
      category: item.category,
      spent: item.spent,
      svg: {
        fill: color,
      },
      key: `bar-${i}`,
    };
  });

  const Labels = ({x, y, bandwidth, data}) =>
    barData.map((value, index) => (
      <SvgText
        key={index}
        x={x(index) + bandwidth / 2}
        y={360}
        fontSize={14}
        fill="black"
        alignmentBaseline={'middle'}
        textAnchor={'end'}
      >
        {value.spent}€
      </SvgText>
    ));

  return (
    <View style={{flexDirection: 'row', height: 400, padding: 16}}>
      <BarChart
        style={{flex: 1}}
        data={barData}
        yAccessor={({item}) => item.spent}
        contentInset={{right: 25, left: 25, bottom: 24}}
        spacingInner={0.15}
        gridMin={0}
      >
        <Labels />
        <Grid direction={Grid.Direction.HORIZONTAL} />
      </BarChart>
    </View>
  );
};
