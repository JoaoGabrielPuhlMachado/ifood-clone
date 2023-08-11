import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import CategoriasApi from "../api/categorias";
const categoriasApi = new CategoriasApi();

export default function CardCategorias() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    async function getAll() {
      const data = await categoriasApi.buscarTodasAsCategorias();
      setCategorias(data);
    }
    getAll();
  }, []);
  async function updateCategorias() {
    const data = await categoriasApi.buscarTodasAsCategorias();
    setCategorias(data);
  }
  return (
    <View style={styles.container}>
      <Text>Categorias</Text>
      <View style={styles.content}>
        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.card}>
            {/* <Image style={styles.imagem} source={{ uri: categoria.capa }} /> */}
            <Text style={styles.texto}>{categoria.descricao}</Text>
          </View>
        ))}
      </View>
      <Button title="Atualizar" onPress={() => updateCategorias()} />
      <StatusBar style="auto" />
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
  imagem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "50%",
    borderRadius: 3,
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "30%",
    height: 80,
    borderRadius: 0,
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: 12,
    borderRadius: 3,
  },
  texto: {
    fontSize: 13,
    color: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
  preco: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
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
