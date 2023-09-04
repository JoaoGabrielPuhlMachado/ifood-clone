import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import { useSetRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth.js";

export default function Perfil() {
  const setUser = useSetRecoilState(authState);
  const logOut = async () => {
    setUser({
      loggedIn: false,
    });
    await SecureStore.deleteItemAsync("access");
  };
  return (
    <ScrollView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <MaterialIcons name="person" size={35} color="#333" />
          <ScrollView style={styles.info}>
            <Text style={styles.title}>Usuário</Text>
            <Text style={styles.description}>
              Informações do perfil do usuário
            </Text>
          </ScrollView>
          <MaterialIcons name="keyboard-arrow-right" color="#999" size={20} />
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <MaterialCommunityIcons name="cart" size={35} color="#333" />
          <ScrollView style={styles.info}>
            <Text style={styles.title}>Carrinho</Text>
            <Text style={styles.description}>
              Todos os produtos do usuário e suas informações
            </Text>
          </ScrollView>
          <MaterialIcons name="keyboard-arrow-right" color="#999" size={20} />
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            logOut();
          }}
        >
          <MaterialCommunityIcons name="logout" size={35} color="#333" />
          <ScrollView style={styles.info}>
            <Text style={styles.title}>Sair</Text>
            <Text style={styles.description}>Realiza o LogOut do Usuário</Text>
          </ScrollView>
          <MaterialIcons name="keyboard-arrow-right" color="#999" size={20} />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    border: 1,
  },
  info: {
    marginLeft: 20,
  },
  title: {
    color: "#333",
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    color: "#999",
  },
});
