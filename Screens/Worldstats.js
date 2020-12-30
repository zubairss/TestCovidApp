import * as React from 'react';
import {Button,View,Text,FlatList,TouchableOpacity,StyleSheet,ActivityIndicator,Image,} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';

const populationAPIOptions = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': '0cd0400b51msha9a6411dc156dfap1c3984jsn12816b8191f4',
    'x-rapidapi-host': 'world-population.p.rapidapi.com',
  },
};

const covidAPIOption = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  headers: {
    'x-rapidapi-key': '0cd0400b51msha9a6411dc156dfap1c3984jsn12816b8191f4',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  },
};

export default function WorldStats({ navigation, route }) {
  const [covidStats, setcovidStats] = useState([0]);
  const [worldPopulation, setworldPopulation] = useState([]);
  const [percentageInfected, setPercentageInfected] = useState(0);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.request(populationAPIOptions).then(function (response) {
        setworldPopulation(response.data.body.world_population); }).then(() => {
          axios.request(covidAPIOption).then(function (response) {
              setcovidStats(...response.data);
            }).catch(function (error) {
              console.error(error);
            });
      }).then(() => setPercentageInfected(((covidStats.confirmed / worldPopulation)*100).toFixed(2))).catch(function (error) {
        console.error(error);
      }).finally(() => setIsLoading(false));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <MaterialIcons name="api"size={35} color="red" style={{marginLeft: 10}}
            onPress={() => navigation.openDrawer()} />
      ),
    });
  });

  return (
    <View>
      {IsLoading?<ActivityIndicator size="large" color="red" style={{marginVertical: 300}}/>:
      <>
      <View style={styles.container}>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>GLOBAL STATISTICS</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <MaterialIcons name="check" color="red" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Confirmed Cases: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{covidStats.confirmed}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <MaterialIcons name="language" color="blue" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total World Population: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{worldPopulation}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <Text style={{color: 'red', fontSize: 20, marginRight: 10, fontWeight: 'bold'}}>%</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Percentage Infected: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{percentageInfected} %</Text> 
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <MaterialIcons name="coronavirus" color="red" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Critical Cases: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{covidStats.critical}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <MaterialIcons name="accessibility" color="lightblue" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Deaths: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{covidStats.deaths}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 5}}>
          <MaterialIcons name="eco" color="green" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Recovered: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{covidStats.recovered}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 20}}>
          <MaterialIcons name="update" color="red" size={25} style={{marginRight: 10}}/>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Last Updated: </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>{covidStats.lastUpdate}</Text>
        </View>

        <Button title="Country List" onPress={() => navigation.navigate('Countries')} />
      </View>
      
      </>
      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});