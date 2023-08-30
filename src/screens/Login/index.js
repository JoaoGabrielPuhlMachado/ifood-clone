import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";

import { authState } from "../../recoil/atoms/auth.js";

export default function Login() {
  const setUser = useSetRecoilState(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const login = async () => {
    try {
      const { data } = await axios.post(
        "http://191.52.55.226:19003/api/token/",
        {
          email: email,
          password: password,
        }
      );
      setUser({
        loggedIn: true,
        access: data.access,
        refresh: data.refresh,
      });
      await SecureStore.setItemAsync("access", data.access);
    } catch (error) {
      setUser({ loggedIn: false, access: null, refresh: null });
      setErrorMsg("Usuário ou senha inválidos!");
      await SecureStore.deleteItemAsync("access");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.login}
        title="Sign in"
        onPress={() => login()}
      >
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <Text>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    backgroundColor: "#f1ebf7",
    width: 75,
    padding: 10,
    borderRadius: 20,
  },
  logintext: {
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    width: 200,
    height: 40,
    border: 1,
    borderColor: "#111111",
  },
});
