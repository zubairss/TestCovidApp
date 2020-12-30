import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorldStats from './Screens/Worldstats';
import Countries from './Screens/Countries';
import FavouriteList from './Screens/FavouriteList';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function Sidebar() {
  return (
    <Drawer.Navigator initialRouteName="Global Stats" drawerType="back" drawerStyle={{backgroundColor: '#fff',width: 270, }}>
      <Drawer.Screen name="Global Stats" component={Global} />
      <Drawer.Screen name="Countries" component={Country} />
      <Drawer.Screen name="Favorite Countries" component={FavList} />
      <Drawer.Screen name="Country Statistic" component={CountryStats} />
    </Drawer.Navigator>
  );
}

const Global = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={WorldStats}
        options={{title: 'COVID-19 STATISTICS',headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};
const Country = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Countries" component={Countries}
        options={{
          title: 'COVID-19 STATISTICS',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
const FavList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourite List"
        component={FavouriteList}
        options={{
          title: 'COVID-19 STATISTICS',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const CountryStats = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Country Stats" component={CountryStats}
        options={{
          title: 'COVID19 TRACKER',
          headerTitleAlign: 'center',
        }}
        initialParams={{ name: "Pakistan"}}
      />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Sidebar />
    </NavigationContainer>
  );
}