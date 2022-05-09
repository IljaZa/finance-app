import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text as SvgText} from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';

export const PieChartComponent = ({
  transactions,
  categories,
  categoryColors,
}) => {
  const [categoriesCount, setCategoriesCount] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    console.log('rendering PieChart Component');
    calcCategoriesCount(transactions, categories);
  }, [isFocused, transactions, categories]);

  const calcCategoriesCount = (transactions, categories) => {
    const categoriesCount = categories.map(category => {
      let count = 0;
      let cat = category;
      transactions.forEach(transaction => {
        if (transaction.category === category) {
          count++;
        }
      });
      return {category: cat, count: count};
    });
    setCategoriesCount(categoriesCount);
  };

  const pieData = categoriesCount.map((item, i) => {
    const index = categoryColors.findIndex(
      obj => obj.category === item.category,
    );
    const color = categoryColors[index].color;
    return {
      category: item.category,
      value: item.count,
      svg: {
        fill: color,
      },
      key: `pie-${i}`,
    };
  });

  const PieLabels = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      let fontSize = 15;

      if (data.value != 0) {
        return (
          <SvgText
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'black'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={fontSize}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.category + ' - ' + data.value}
          </SvgText>
        );
      }
    });
  };

  return (
    <PieChart
      style={{width: 400, height: 370}}
      valueAccessor={({item}) => item.value}
      outerRadius={'90%'}
      innerRadius={10}
      spacing={0}
      data={pieData}
    >
      <PieLabels />
    </PieChart>
  );
};
