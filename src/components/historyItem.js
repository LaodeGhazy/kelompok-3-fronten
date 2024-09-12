import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Text, Image } from "react-native";
import { format } from "date-fns";

const Stack = createNativeStackNavigator();

export default function HistoryItem({item}) {
  const ikonStatus = item.result == true ? require('../../assets/win.png') : require('../../assets/lose.png') 
  const gameResult = item.result == true ? "Win" : "Lose";
  const date = format(new Date(item.date), 'yyyy/MM/dd')
  const time = format(new Date(item.date), 'HH:mm')
  
  return (
      <View style = {styles.contentHistory}>
        <Image 
          source={ ikonStatus } 
          style = {styles.image}
        />
        <Text style = {styles.winlose}>{gameResult}</Text>
        <Text style = {styles.skor}>{item.score}:{item.computer_score}</Text>
        <View style ={styles.dateContainer}>
          <Text style ={styles.date}>{date}</Text>
          <Text style ={styles.hours}>{time}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  contentHistory:{
    flexDirection: 'row',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
  },
  image: {
    width: 50,
    height: 50
  },
  winlose: {
   color: '#49a472',
   fontSize: 25,
   fontWeight: 'bold'
  },
  skor: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  dateContainer:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
});
