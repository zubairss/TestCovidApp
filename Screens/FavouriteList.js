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


export default function FavouriteList({ navigation, route }) {
const [countriesNames, setCountriesNames] = useState([]);
const [fav, setFav] = [route.params.fav, route.params.setFav];

  useEffect(() => {
    // setCountriesNames(route.params.fav);
    console.log(countriesNames);
  }, [fav]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <MaterialIcons name="reply"size={35} color="red" style={{marginLeft: 10}}
            onPress={() => navigation.goBack()} />
      )
    });
  });

  const favHanlder = (name) => {
    setFav(() => fav.splice(fav.indexOf(name), 1))
  }

  return (
    <View>
      <ScrollView>
        <Text>Yeh wohi Fav ha</Text>
            {
                countriesNames.map((item) => {
                    return(
                      <View key={item} style={{display: 'flex', alignItems: 'center', flexDirection:'row', marginLeft: 100, marginBottom: 10}}>
                        <MaterialIcons name="close" size={35} color="orange" style={{marginRight: 10}}
                        onPress={() => favHanlder(item)} />
                        <TouchableOpacity>
                          <Text style={{fontSize: 20}}>{item}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                })
            }
        </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({});