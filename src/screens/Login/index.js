import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import api from "@/../../src/services/api.js";
import { SocialIcon } from "react-native-elements";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Linking,
} from "react-native";

import { authState } from "../../recoil/atoms/auth.js";

export default function Login() {
  const setUser = useSetRecoilState(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const login = async () => {
    try {
      const { data } = await api.post("token/", {
        email: email,
        password: password,
      });
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
      <Text style={styles.cabecalho}>{`Bem-Vindo à\n Lígia Roupas`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        style={styles.login}
        title="Sign in"
        onPress={() => login()}
      >
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <Text>{errorMsg}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 1,
            marginLeft: 20,
            backgroundColor: "black",
          }}
        />
        <View>
          <Text style={{ paddingHorizontal: 8, textAlign: "center" }}>
            Nossas Redes
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 1,
            marginRight: 20,
            backgroundColor: "black",
          }}
        />
      </View>
      <View style={styles.icones}>
        <SocialIcon
          style={styles.icone}
          title="Siga-nos"
          button
          light
          iconSize={23}
          type="instagram"
          onPress={() => Linking.openURL("http://instagram.com/JoaoSttirlley")}
        />
        <SocialIcon
          style={styles.icone}
          title="Criador"
          button
          light
          iconSize={24}
          type="github"
          onPress={() =>
            Linking.openURL("http://github.com/JoaoGabrielPuhlMachado")
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1ebf7",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: -10,
  },
  logintext: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  cabecalho: {
    fontSize: 45,
    marginTop: -130,
    marginBottom: 140,
  },
  icones: {
    flexDirection: "row",
  },
  icone: {
    width: 118,
    height: 50,
    borderRadius: 10,
  },
});
