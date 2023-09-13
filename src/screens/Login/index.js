import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import api from "@/../../src/services/api.js";
import { SocialIcon } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Linking,
} from "react-native";

import { authState, useAuth } from "../../recoil/atoms/auth.js";

export default function Login({ navigation }) {
  const { setToken } = useAuth();
  const { auth } = useAuth();
  const setAuth = useSetRecoilState(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const { data } = await api.post("token/", {
        email: email,
        password: password,
      });

      await setToken(data.access);

      setAuth({
        isLogged: true,
        token: data.access,
        refresh: data.refresh,
        userID: data.userId,
      });
      console.log(auth);
      await SecureStore.setItemAsync("access", data.access);
    } catch (error) {
      setAuth({ isLogged: false, token: null, refresh: null, userID: null });
      setErrorMsg("Email ou senha inválidos!");
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
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordTextInput}
          placeholder="Password"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          style={styles.togglePasswordIcon}
          onPress={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <Text>{errorMsg}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.login}
        onPress={() => login()}
      >
        <Text style={styles.logintext}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 1,
            marginLeft: 20,
            backgroundColor: "black",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Registro")}
          style={styles.registrowrap}
        >
          <Text style={styles.semconta}>Não tem conta?</Text>
          <Text style={styles.registrotext}> Registre-se!</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 1,
            marginRight: 20,
            backgroundColor: "black",
          }}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 130 }}
      >
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
        <TouchableOpacity
          style={styles.icone}
          activeOpacity={0.6}
          onPress={() => Linking.openURL("http://instagram.com/JoaoSttirlley")}
        >
          <SocialIcon
            title="Siga-me"
            button
            light
            iconSize={23}
            type="instagram"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icone}
          activeOpacity={0.6}
          onPress={() =>
            Linking.openURL("http://github.com/JoaoGabrielPuhlMachado")
          }
        >
          <SocialIcon
            title="Siga-me"
            button
            light
            iconSize={23}
            type="github"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(255,255,255,0.8)",
    width: 250,
    height: 50,
    marginBottom: 10,
  },
  passwordTextInput: {
    flex: 1,
    padding: 10,
  },
  togglePasswordIcon: {
    padding: 10,
  },
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
    marginTop: 20,
    marginBottom: 10,
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
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  cabecalho: {
    fontSize: 45,
    marginTop: 50,
    marginBottom: 180,
  },
  icones: {
    flexDirection: "row",
  },
  icone: {
    width: 130,
    height: 65,
    borderRadius: 10,
  },
  registrotext: {
    color: "rgba(200,0,0,1)",
    paddingRight: 8,
  },
  semconta: {
    paddingLeft: 8,
  },
  registrowrap: {
    flexDirection: "row",
  },
});
