import * as React from 'react';
import { Button,View,Text,StyleSheet,FlatList,SafeAreaView,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {ScrollView, TextInput,TouchableOpacity,} from 'react-native-gesture-handler';

const populationAPIOptions = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-key': '0cd0400b51msha9a6411dc156dfap1c3984jsn12816b8191f4',
    'x-rapidapi-host': 'world-population.p.rapidapi.com',
  },
};

export default function Countries({ navigation, route }) {
const [isLoading, setisLoading] = useState(true);
const [countriesNames, setCountriesNames] = useState([]);
const [favCounties, setFavCountries] = useState([]);
  useEffect(() => {
    axios.request(populationAPIOptions).then((response) => {
        setCountriesNames(response.data.body.countries);
      }).catch(function (error) {
        console.error(error);
      }).finally(() => setisLoading(false))
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <MaterialIcons name="api"size={35} color="red" style={{marginLeft: 10}}
            onPress={() => navigation.openDrawer()} />
      )
    });
  });

  const favHanlder = (name) => {
    if(!favCounties.includes(name)){
      setFavCountries([...favCounties, name]);
      console.log(favCounties)
    }
  }

  return (
    <View style={{display: 'flex'}}>
      <Text style={{position: "absolute", alignSelf: 'center'}}>Click on Icon to Add to Fav</Text>
      <View style={{alignSelf: 'flex-end'}}>
        <MaterialIcons name="grade" size={35} color="orange" style={{marginRight: 10}}
            onPress={() => navigation.navigate('Favorite Countries', { fav: favCounties, setFav: favCounties} )} />
      </View>

      {isLoading?<ActivityIndicator size="large" color="red" style={{marginVertical: 300}}/>:
      <>
      <ScrollView>
            {
                countriesNames.map((item) => {
                    return(
                      <View key={item} style={{display: 'flex', alignItems: 'center', flexDirection:'row', marginLeft: 100, marginBottom: 10}}>
                        <MaterialIcons name="add" size={35} color="orange" style={{marginRight: 10}}
                        onPress={() => favHanlder(item)} />
                        <TouchableOpacity onPress={() => navigation.navigate('Country Statistic', { name: item })}>
                          <Text style={{fontSize: 20}}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                })
            }
        </ScrollView>
      </>}
        
    </View>
  );
}

const styles = StyleSheet.create({});