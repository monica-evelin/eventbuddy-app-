import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signIn } from "../services/firebaseAuth";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/styles";
import { TouchableOpacity } from "react-native";
import Background from "../components/Background";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error.message);
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

        <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
          <Text style={styles.login_buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.login_link}>No account? Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RecoverPassword")}
        >
          <Text style={styles.login_link}>
            Forgot your password? Recover it.
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
