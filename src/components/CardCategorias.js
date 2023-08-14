import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
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
      <Text style={styles.titulo}>Categorias</Text>
      <View style={styles.content}>
        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.card}>
            <Image
              style={styles.imagem}
              source={{ uri: categoria.capa_categoria?.file }}
            />
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
    height: "85%",
    borderRadius: 3,
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "47%",
    height: 200,
    borderRadius: 0,
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: 12,
    borderRadius: 3,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  texto: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowRadius: 20,
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
