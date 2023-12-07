import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useRecoilValue } from "recoil";
import { dadosState } from "../../recoil/atoms/dados.js";

export default function CardCategorias() {
  const navigation = useNavigation();
  const { categorias } = useRecoilValue(dadosState);

  if (!categorias || categorias.length === 0) {
    return <Text style={styles.loading}>Carregando categorias...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorias</Text>
      <View style={styles.content}>
        {categorias.map((categoria) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={categoria.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Categoria", { descricao: categoria.descricao })
            }
          >
            <Image
              style={styles.imagem}
              source={{ uri: categoria.capa_categoria?.url }}
            />
            <Text style={styles.texto}>{categoria.descricao}</Text>
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
    marginBottom: "29%",
  },
  imagem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "85%",
    borderRadius: 3,
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "23.5%",
    height: 100,
    borderRadius: 0,
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: 12,
    borderRadius: 3,
  },
  titulo: {
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  texto: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
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
