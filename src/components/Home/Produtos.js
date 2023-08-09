import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import ProdutosApi from "../../api/produtos";
const produtosApi = new ProdutosApi();

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    async function getAll() {
      const data = await produtosApi.buscarTodosOsProdutos();
      setProdutos(data);
    }
    getAll();
  }, []);
  async function updateProdutos() {
    const data = await produtosApi.buscarTodosOsProdutos();
    setProdutos(data);
  }
  return (
    <View style={styles.container}>
      <Text>Produtos</Text>
      {produtos.map((produto) => (
        <Text key={produto.id}>
          {produto.nome}
          {produto.preco}
          {produto.marca.nome_marca}
          {produto.categoria.descricao}
        </Text>
      ))}
      <Button title="Atualizar" onPress={() => updateProdutos()} />
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
