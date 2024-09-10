import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import HistoryData from "../contants/history.json";
import HistoryItem from "../components/historyItem";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/setup";

// import RegisterScreen from "./RegisterScreen";

export default function HistoryScreen() {
  
  const [games, setGames] = useState([]); // Initial empty array of game history

  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "games"), where("score", "==", 3)); // Filter for games with score 3
      const querySnapshot = await getDocs(q);
      const fetchedGames = [];
      querySnapshot.forEach((doc) => {
        fetchedGames.push(doc.data()); // Add entire game data to the array
      });
      setGames(fetchedGames);
    }
    fetchData();
  }, [db]); // Dependency array to fetch data only when db changes

  console.log(games)

  // const handleGoBack = () => {
  //   navigation.goBack(); // Use navigation prop to navigate back
  // };
  
  // / const history = () => {
  //   // show history
  //   const [games, setGames] = useState([]); // Initial empty array of game history
  //   useEffect(() => {
  //     async function fetchData() {
  //       const q = query(collection(db, "games"), where("score", "==", 3));
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //         setGames(doc.data().score)
  //       });
  //     }
  //     fetchData();
  //   }, []);
  // }

  // const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.navbar}>
        <Pressable
          // onPress={history} //tombol back
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={40}
            color={"white"}
          />
        </Pressable>
        <Text style={styles.navbarTitle}>History</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={require("../../assets/history.png")} />
      </View>
      <View style={styles.historyContainer}>
        <FlatList
          data={games}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryItem item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#75b4ac",
    justifyContent: "space-between",
    paddingTop: 75,
    paddingHorizontal: 30,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 70,
  },
  navbarTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  historyContainer: {
    // margin: 35,
    marginBottom: 0,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
