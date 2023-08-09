import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import CategoriasApi from "../../api/categorias";
const categoriasApi = new CategoriasApi();

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    async function getAll() {
        const data = await categoriasApi.buscarTodasAsCategorias();
        setCategorias(data);
      }  
    getAll()
  }, []);
  async function updateCategorias() {
    const data = await categoriasApi.buscarTodasAsCategorias();
    setCategorias(data);
  }
  return (
    <View style={styles.container}>
      <Text>Categorias</Text>
      {categorias.map((categoria) => (
        <Text key={categoria.id}>{categoria.descricao}</Text>
      ))}
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
});
