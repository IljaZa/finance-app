import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './screens/HomeScreen';
import {StatsScreen} from './screens/StatsScreen';
import {Icon} from '@rneui/themed';

const Tab = createBottomTabNavigator();

export default function App() {
  const [rates, setRates] = React.useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Stats') {
              iconName = 'equalizer';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
