import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/styles";
import Background from "../components/Background";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao criar conta:", error.message);
      Alert.alert("Erro", "Não foi possível criar a conta.");
    }
  };

  return (
    <Background>
      <View style={styles.login_container}>
        <Text style={styles.login_label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.login_input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.login_label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.login_input}
        />

        <TouchableOpacity style={styles.login_button} onPress={handleSignUp}>
          <Text style={styles.login_buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login_link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
