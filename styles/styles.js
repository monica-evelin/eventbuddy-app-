// styles/styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  // Cards de eventos na Home
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    margin: 10,
  },
  date: {
    fontSize: 14,
    color: "#ccc",
    marginHorizontal: 10,
    marginBottom: 10,
  },

  // Botões
  button: {
    backgroundColor: "#1E1E1E",
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Botões de ação em linha
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  mapButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  favButton: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },

  // Login, Signup, Recovery
  login_container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  login_input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  login_label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  login_button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  login_buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  login_link: {
    color: "#4CAF50",
    marginTop: 10,
    textAlign: "center",
  },

  // Event Details
  eventDescription: {
    color: "#ddd",
    fontSize: 16,
    marginTop: 12,
    lineHeight: 22,
    textAlign: "justify",
  },
  home_list: {
    paddingBottom: 20,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Se quiser escurecer a imagem levemente
    padding: 16, // Para manter consistência com seu .container
  },

  list: {
    paddingBottom: 30,
  },
});
export default styles;
