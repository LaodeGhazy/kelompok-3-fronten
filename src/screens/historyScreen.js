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
import HistoryItem from "../components/historyItem";
import { Ionicons } from "@expo/vector-icons";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

// import RegisterScreen from "./RegisterScreen";

export default function HistoryScreen() {
  
  const [games, setGames] = useState([]); // Initial empty array of game history

  useEffect(() => {
    async function fetchData() {
      const parentCollectionName = "users";
      const parentDocumentId = "lala"; // will change to current active user
      const subcollectionName = "games";

      const parentDocRef = doc(db, parentCollectionName, parentDocumentId);

      const docSnapshot = await getDoc(parentDocRef);

      if (docSnapshot.exists) {
        const subcollectionRef = collection(parentDocRef, subcollectionName);

        const subcollectionQuery = query(subcollectionRef, orderBy('date', 'desc'));

        const fetchedGames = [];
        const subcollectionQuerySnapshot = await getDocs(subcollectionQuery);
        subcollectionQuerySnapshot.forEach((subdoc) => {
          console.log(subdoc.id, "=>", subdoc.data());
          fetchedGames.push(subdoc.data());
        });
        setGames(fetchedGames);
      } else {
        console.log("Document does not exist");
      }
    }
    fetchData();
  }, [db]);

  return (
    <View style={styles.screen}>
      <View style={styles.navbar}>
        <Pressable
          onPress={() => navigation.navigate("RegisterScreen")} //tombol back
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
