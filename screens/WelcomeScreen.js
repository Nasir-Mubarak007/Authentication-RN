import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(authContext);
  const token = authCtx.token;
  const [message, setMessage] = useState();
  useEffect(() => {
    axios
      .get(
        "https://j0b-search-default-rtdb.firebaseio.com/Message.json?auth=" +
          token
      )
      .then((response) => setMessage(response.data))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
