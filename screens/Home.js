import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import { database } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/styles";

const BACKGROUND_IMAGE = require("../assets/fundo.png");

export default function Home() {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = database
      .collection("events")
      .orderBy("datetime", "asc")
      .limit(4)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data);
      });

    return () => unsubscribe();
  }, []);

  const renderEvent = (event) => {
    const dateObj = event.datetime?.toDate
      ? event.datetime.toDate()
      : new Date(event.datetime);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const latitude =
      event.location?.latitude || event.location?.geopoint?.latitude;
    const longitude =
      event.location?.longitude || event.location?.geopoint?.longitude;

    return (
      <TouchableOpacity
        key={event.id}
        style={[
          styles.card,
          {
            padding: 20,
            marginVertical: 16,
            width: "95%",
            alignSelf: "center",
          },
        ]}
        onPress={() =>
          navigation.navigate("EventDetails", { eventId: event.id })
        }
      >
        <Image
          source={{ uri: event.imageUrl }}
          style={[styles.image, { height: 200, borderRadius: 10 }]}
        />
        <Text
          style={[
            styles.cardTitle,
            { fontSize: 22, textAlign: "center", marginVertical: 10 },
          ]}
        >
          {event.title}
        </Text>
        <Text style={[styles.date, { fontSize: 16 }]}>{`${date} ${time}`}</Text>
        <Text
          style={[
            styles.eventDescription,
            { marginVertical: 10, textAlign: "center" },
          ]}
          numberOfLines={2}
        >
          {event.description || "No description"}
        </Text>

        {latitude && longitude ? (
          <Text
            style={[styles.link, { textAlign: "center", marginTop: 10 }]}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps?q=${latitude},${longitude}`
              )
            }
          >
            📍 View on map
          </Text>
        ) : (
          <Text style={[styles.date, { textAlign: "center", marginTop: 10 }]}>
            Location not available
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        >
          <Text
            style={[
              styles.header,
              { marginTop: 30, color: "white", fontSize: 28 },
            ]}
          >
            Upcoming Events
          </Text>

          {events.map(renderEvent)}
          <TouchableOpacity
            style={[
              styles.logout_button,
              { backgroundColor: "#2196F3", marginTop: 20 },
            ]}
            onPress={logout}
          >
            <Text style={styles.login_buttonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
