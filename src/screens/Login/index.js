import { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";

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
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => login()} />
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
});
