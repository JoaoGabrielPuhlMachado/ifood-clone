import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useRecoilValue } from "recoil";
import { dadosState } from "../../recoil/atoms/dados.js";

export default function CardMarcas() {
  const navigation = useNavigation();
  const { marcas } = useRecoilValue(dadosState);

  if (!marcas || marcas.length === 0) {
    return <Text style={styles.loading}>Carregando marcas...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Marcas</Text>
      <View style={styles.content}>
      {marcas.map((marca) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={marca.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Marca", { nome_marca: marca.nome_marca })
            }
          >
            <Image
              style={styles.imagem}
              source={{ uri: marca.logo_marca?.url }}
            />
          </TouchableOpacity>
        ))}
      </View>
      <StatusBar style="auto" />
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
  loading: {
    fontSize: 25,
    textAlign: "center",
    marginTop: "29%",
    marginBottom: "29%",
  },
  imagem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
    borderRadius: 3,
  },
  titulo: {
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "30%",
    height: 75,
    borderRadius: 0,
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: 12,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1ebf7",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
