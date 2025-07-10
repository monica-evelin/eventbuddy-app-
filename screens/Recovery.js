import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth } from "../firebaseConfig";
import styles from "../styles/styles";
import Background from "../components/Background";

export default function Recuperacao({ navigation }) {
  const [email, setEmail] = useState("");

  const recuperarSenha = () => {
    if (email.trim() === "") {
      Alert.alert("Erro!", "Digite o email da conta.");
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Sucesso", "Email de recuperação enviado!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro!", "Não foi possível enviar o email.");
      });
  };

  return (
    <Background>
      <View style={styles.login_container}>
        <Text style={styles.login_label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.login_input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.login_button} onPress={recuperarSenha}>
          <Text style={styles.login_buttonText}>Recover Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.login_link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login_link}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
