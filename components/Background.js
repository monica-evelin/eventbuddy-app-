import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/fundo.png")} // caminho da sua imagem
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
  },
});

export default Background;
