import * as React from 'react';
import { View, StyleSheet, Text, Image, FlatList, Pressable } from "react-native";
import HistoryData  from "../contants/history.json";
import HistoryItem  from "../components/historyItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
// import RegisterScreen from "./RegisterScreen";


export default function HistoryScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.screen}>
      <View style={styles.navbar}>
        <Pressable
          onPress={() => navigation.navigate('ArenaGame')} //tombol back
        >
          <Ionicons 
            name='arrow-back-circle-outline'
            size={40}
            color={'white'}
          />
        </Pressable>
        <Text style={styles.navbarTitle}>History</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require('../../assets/history.png')}/>
      </View>
      <View style={styles.historyContainer}>
        <FlatList
          data={HistoryData.history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (<HistoryItem item={item}/>)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    backgroundColor: '#75b4ac',
    justifyContent: 'space-between',
    paddingTop: 75,
    paddingHorizontal: 30
  },
  navbar:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 70
  },
  navbarTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    color:'white'
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  historyContainer:{
    // margin: 35,
    marginBottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
});
