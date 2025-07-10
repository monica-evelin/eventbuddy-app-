import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import styles from "../styles/styles";
import Background from "../components/Background";

export default function EventDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { eventId } = route.params;

  const [event, setEvent] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [participating, setParticipating] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(database, "events", eventId),
      (docSnap) => {
        if (docSnap.exists()) {
          setEvent(docSnap.data());
          setParticipantsCount(docSnap.data().participants?.length || 0);
        }
      }
    );
    return () => unsubscribe();
  }, [eventId]);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(database, "users", user.uid);

    async function fetchUserStatus() {
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFavorited(data.favorites?.includes(eventId) || false);
          setParticipating(data.participations?.includes(eventId) || false);
        } else {
          await setDoc(userRef, { favorites: [], participations: [] });
          setFavorited(false);
          setParticipating(false);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    }

    fetchUserStatus();
  }, [user, eventId]);

  const toggleFavorite = async () => {
    if (!user) return;
    const userRef = doc(database, "users", user.uid);
    try {
      if (favorited) {
        await updateDoc(userRef, { favorites: arrayRemove(eventId) });
        setFavorited(false);
      } else {
        await updateDoc(userRef, { favorites: arrayUnion(eventId) });
        setFavorited(true);
      }
    } catch (error) {
      Alert.alert("Error", "Could not update favorites.");
      console.error("Error updating favorites:", error);
    }
  };

  const toggleParticipation = async () => {
    if (!user) return;

    const userRef = doc(database, "users", user.uid);
    const eventRef = doc(database, "events", eventId);

    try {
      if (participating) {
        await Promise.all([
          updateDoc(userRef, { participations: arrayRemove(eventId) }),
          updateDoc(eventRef, { participants: arrayRemove(user.uid) }),
        ]);
        setParticipating(false);
        Alert.alert(
          "Participation removed",
          "You are no longer participating in this event."
        );
      } else {
        await Promise.all([
          updateDoc(userRef, { participations: arrayUnion(eventId) }),
          updateDoc(eventRef, { participants: arrayUnion(user.uid) }),
        ]);
        setParticipating(true);
        Alert.alert("Success", "You are now participating in this event!");
      }
    } catch (error) {
      Alert.alert("Error", "Could not update participation.");
      console.error("Error updating participation:", error);
    }
  };

  if (!event) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  const dateObj = event.datetime?.toDate
    ? event.datetime.toDate()
    : new Date(event.datetime);
  const dateStr = dateObj.toLocaleDateString();
  const timeStr = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const latitude =
    event.location?.latitude || event.location?.geopoint?.latitude;
  const longitude =
    event.location?.longitude || event.location?.geopoint?.longitude;

  return (
    <Background>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {event.imageUrl && (
          <Image
            source={{ uri: event.imageUrl }}
            style={[styles.image, { height: 220, borderRadius: 10 }]}
          />
        )}

        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: 26,
              marginTop: 20,
              marginBottom: 10,
              textAlign: "center",
            },
          ]}
        >
          {event.title}
        </Text>

        <Text
          style={[
            styles.date,
            { fontSize: 16, marginBottom: 12, textAlign: "center" },
          ]}
        >
          {dateStr} at {timeStr}
        </Text>

        <Text
          style={[
            styles.location,
            {
              fontSize: 16,
              color: "#444",
              marginBottom: 12,
              textAlign: "center",
            },
          ]}
        >
          {event.locationName || "Location not provided"}
        </Text>

        <Text
          style={[
            styles.eventDescription,
            { fontSize: 18, lineHeight: 26, marginBottom: 20 },
          ]}
        >
          {event.description}
        </Text>

        {latitude && longitude ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#2196F3",
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
              alignItems: "center",
            }}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps?q=${latitude},${longitude}`
              )
            }
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              View on Map 📍
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{ color: "#666", marginBottom: 20, fontStyle: "italic" }}
          >
            Location not available
          </Text>
        )}

        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
          Participants: {participantsCount}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: participating ? "#43a047" : "#2196F3",
            padding: 14,
            borderRadius: 8,
            marginBottom: 15,
            alignItems: "center",
          }}
          onPress={toggleParticipation}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {participating ? "Cancel Participation" : "Participate"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: favorited ? "#f44336" : "#2196F3",
            padding: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={toggleFavorite}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {favorited ? "Remove from Favorites" : "Add to Favorites"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#2196F3", fontSize: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
}
