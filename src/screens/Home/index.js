import React, { useCallback } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useSetRecoilState } from "recoil";
import { dadosState } from "../../recoil/atoms/dados.js";
import { useState } from "react";

import Categorias from "../../components/Home/Categorias";
import Produtos from "../../components/Home/Produtos";
import Marcas from "../../components/Home/Marcas";

import MarcasApi from "../../api/marcas";
const marcasApi = new MarcasApi();
import ProdutosApi from "../../api/produtos";
const produtosApi = new ProdutosApi();
import CategoriasApi from "../../api/categorias";
const categoriasApi = new CategoriasApi();

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const setAtualizar = useSetRecoilState(dadosState);

  const update = async () => {
    const categoriasData = await categoriasApi.buscarTodasAsCategorias();
    const marcasData = await marcasApi.buscarTodasAsMarcas();
    const produtosData = await produtosApi.buscarTodosOsProdutos();
    setAtualizar({
      categorias: categoriasData,
      marcas: marcasData,
      produtos: produtosData,
    });
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    update();
  }, []);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Categorias />
      <Marcas />
      <Produtos />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
