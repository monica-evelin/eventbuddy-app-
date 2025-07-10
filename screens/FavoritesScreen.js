import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { database } from "../firebaseConfig";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import Background from "../components/Background";

export default function FavoritesScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Escuta o documento do usuário em tempo real
    const userRef = doc(database, "users", user.uid);
    const unsubscribe = onSnapshot(
      userRef,
      async (userDoc) => {
        if (!userDoc.exists()) {
          setFavorites([]);
          setLoading(false);
          return;
        }
        const favoriteIds = userDoc.data().favorites || [];

        if (favoriteIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        setLoading(true);

        try {
          // Busca os eventos cujos IDs estão em favoriteIds
          const eventsRef = collection(database, "events");

          // Firestore permite até 10 valores em 'in' no where
          const chunkedIds = [];

          for (let i = 0; i < favoriteIds.length; i += 10) {
            chunkedIds.push(favoriteIds.slice(i, i + 10));
          }

          const eventsList = [];

          for (const chunk of chunkedIds) {
            const q = query(eventsRef, where("__name__", "in", chunk));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
              eventsList.push({ id: doc.id, ...doc.data() });
            });
          }

          setFavorites(eventsList);
        } catch (error) {
          console.error("Error loading favorited events:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error listening to user doc:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }) => {
    const dateStr = item.datetime?.toDate
      ? item.datetime.toDate().toLocaleDateString()
      : "No date";

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("EventDetails", { eventId: item.id })
        }
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : null}
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.date}>{dateStr}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text
          style={[
            styles.header,
            {
              marginTop: 30,
              color: "white",
              fontSize: 28,
              textAlign: "center",
            },
          ]}
        >
          Favorites
        </Text>

        <View style={{ height: 20 }} />

        {loading ? (
          <Text style={[styles.date, { color: "white", textAlign: "center" }]}>
            Loading...
          </Text>
        ) : favorites.length === 0 ? (
          <Text style={[styles.date, { color: "white", textAlign: "center" }]}>
            No favorites found.
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 30 }}
            style={{ marginTop: 10 }}
          />
        )}
      </View>
    </Background>
  );
}
