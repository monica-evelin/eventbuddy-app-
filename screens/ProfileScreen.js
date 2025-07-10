import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { database, storage } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../styles/styles";
import Background from "../components/Background";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(database, "users", user.uid);
    getDoc(userRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setBirthdate(data.birthdate || "");
          setPhotoURL(data.photoURL || null);
        }
      })
      .catch(() => {
        Alert.alert("Error", "Failed to load user data.");
      });
  }, [user]);

  const handleBirthdateChange = (text) => {
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    if (cleaned.length <= 2) {
      setBirthdate(cleaned);
    } else if (cleaned.length <= 4) {
      setBirthdate(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setBirthdate(
        `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`
      );
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await setDoc(
        doc(database, "users", user.uid),
        {
          name,
          birthdate,
          photoURL,
        },
        { merge: true }
      );
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile data.");
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    // código para pickImage se quiser incluir
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Foto do perfil */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          {photoURL ? (
            <Image
              source={{ uri: photoURL }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No photo</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={pickImage}
            style={{
              marginTop: 10,
              backgroundColor: "#2196F3",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "#fff" }}>Choose Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Nome */}
        <Text style={styles.login_label}>Name:</Text>
        <TextInput
          style={styles.login_input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />

        {/* Email */}
        <Text style={[styles.login_label, { marginTop: 16 }]}>Email:</Text>
        <TextInput
          style={styles.login_input}
          value={user?.email || ""}
          editable={false} // desabilita edição
          selectTextOnFocus={false}
        />

        {/* Data de nascimento */}
        <Text style={[styles.login_label, { marginTop: 16 }]}>Birthdate:</Text>
        <TextInput
          style={styles.login_input}
          value={birthdate}
          onChangeText={handleBirthdateChange}
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
          maxLength={10}
        />

        {/* Botão salvar */}
        <TouchableOpacity
          style={[
            styles.login_button,
            { marginTop: 20, backgroundColor: "#43a047" },
          ]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.login_buttonText}>Save Profile</Text>
          )}
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logout_button, { marginTop: 20 }]}
          onPress={logout}
        >
          <Text style={styles.login_buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
}
