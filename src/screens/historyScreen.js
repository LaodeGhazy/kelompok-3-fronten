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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db, FIREBASE_AUTH } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

export default function HistoryScreen() {
  const navigation = useNavigation();

  const [games, setGames] = useState([]); // Initial empty array of game history

  const auth = FIREBASE_AUTH;
  useEffect(() => {
    const stopListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const name = userEmail.split("@");
        console.log("test:", userEmail);
        console.log(name[0]);

        const parentCollectionName = "users";
        const subcollectionName = "games";
        const parentDocumentId = name[0];
        const parentDocRef = doc(db, parentCollectionName, parentDocumentId);

        const docSnapshot = await getDoc(parentDocRef);

        if (docSnapshot.exists) {
          const subcollectionRef = collection(parentDocRef, subcollectionName);

          const subcollectionQuery = query(
            subcollectionRef,
            orderBy("date", "desc")
          );

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
    });
    return () => stopListener();
  }, [db]);

  return (
    <View style={styles.screen}>
      <View style={styles.navbar}>
        <Pressable
          onPress={() => navigation.navigate('ArenaGame')} //tombol back
        >
          <Ionicons 
            name='arrow-back-circle-outline'
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
